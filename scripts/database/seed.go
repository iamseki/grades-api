package database

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
	"sync"

	_ "github.com/lib/pq"
)

type seed struct {
	database *sql.DB
}

// CountrySeedObj bla
type CountrySeedObj struct {
	Countries []Country `json:"countries"`
}

// Country ble
type Country struct {
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
}

// CollegeSeedObj bla
type CollegeSeedObj struct {
	Colleges []College `json:"colleges"`
}

// College ble
type College struct {
	CountryName   string `json:"countryName"`
	Name          string `json:"name"`
	ShortName     string `json:"shortName"`
	GradesSystem  string `json:"gradesSystem"`
	GradesAverage int    `json:"gradesAverage"`
}

// SubjectsSeedObj bla
type SubjectsSeedObj struct {
	Subjects []Subject `json:"subjects"`
}

// Subject ble
type Subject struct {
	Name      string `json:"name"`
	ShortName string `json:"shortName"`
}

// CoursesSeedObj bla
type CoursesSeedObj struct {
	Courses []Course `json:"courses"`
}

// Course ble
type Course struct {
	Name      string `json:"name"`
	ShortName string `json:"shortName"`
}

func (s *seed) Execute(table string) {
	db, err := sql.Open("postgres", os.Getenv("POSTGRES_URL"))
	if err != nil {
		log.Fatal(err)
	}
	s.database = db
	defer db.Close()

	var wg sync.WaitGroup
	// check if the passed table had some data
	// if table = none seed all stuff
	if table == "none" {
		log.Printf("Executing seed in all tables\n")

		wg.Add(1)
		go s.seedSubjects(&wg)

		s.seedCountries()
		s.seedColleges()
		s.seedCourses()

		wg.Wait()
		log.Printf("Finished seed in all tables\n")
	}
}

func (s *seed) seedCourses() {
	log.Println("Seeding courses table..")

	file := readFileInDatabaseFolder("courses_seed.json")
	data := CoursesSeedObj{}
	err := json.Unmarshal([]byte(file), &data)
	if err != nil {
		log.Fatal(err)
	}
	sqlStatement := `SELECT id FROM colleges WHERE "shortName" like 'FTT'`
	rs := s.database.QueryRow(sqlStatement)

	var id string
	rs.Scan(&id)

	sqlStatement = `
	INSERT INTO courses("collegeId",name,"shortName")
	VALUES
	`

	for i, c := range data.Courses {
		if i != len(data.Courses)-1 {
			sqlStatement += "('" + id + "','" + c.Name + "','" + c.ShortName + "'),"
		} else {
			// avoiding comma ',' in final line
			sqlStatement += "('" + id + "','" + c.Name + "','" + c.ShortName + "') ON CONFLICT DO NOTHING"
		}
	}

	s.executeQuery(sqlStatement)
}

func (s *seed) seedSubjects(wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println("Seeding subjects table..")

	file := readFileInDatabaseFolder("subjects_seed.json")
	data := SubjectsSeedObj{}
	err := json.Unmarshal([]byte(file), &data)
	if err != nil {
		log.Fatal(err)
	}

	sqlStatement := `
		INSERT INTO subjects(name,"shortName")
		VALUES
		`

	for i, sub := range data.Subjects {
		if i != len(data.Subjects)-1 {
			sqlStatement += "('" + sub.Name + "','" + sub.ShortName + "'),"
		} else {
			// avoiding comma ',' in final line
			sqlStatement += "('" + sub.Name + "','" + sub.ShortName + "') ON CONFLICT DO NOTHING"
		}
	}

	s.executeQuery(sqlStatement)
}

// For now just seed colleges from Brazil
func (s *seed) seedColleges() {
	log.Println("Seeding colleges table..")

	file := readFileInDatabaseFolder("colleges_seed.json")
	data := CollegeSeedObj{}
	err := json.Unmarshal([]byte(file), &data)
	if err != nil {
		log.Fatal(err)
	}

	sqlStatement := "SELECT id FROM countries WHERE name like 'Brazil'"
	rs := s.database.QueryRow(sqlStatement)

	var id string
	rs.Scan(&id)

	sqlStatement = `
	INSERT INTO colleges("countryId",name,"shortName","gradesSystem","gradesAverage")
	VALUES
	`

	for i, c := range data.Colleges {
		if i != len(data.Colleges)-1 {
			sqlStatement += "('" + id + "','" + c.Name + "','" + c.ShortName + "','" + c.GradesSystem + "'," + strconv.Itoa(c.GradesAverage) + "),"
		} else {
			// avoiding comma ',' in final line
			sqlStatement += "('" + id + "','" + c.Name + "','" + c.ShortName + "','" + c.GradesSystem + "'," + strconv.Itoa(c.GradesAverage) + ") ON CONFLICT DO NOTHING"
		}
	}

	s.executeQuery(sqlStatement)
}

func (s *seed) seedCountries() {
	log.Println("Seeding countries table...")
	file := readFileInDatabaseFolder("countries_seed.json")
	data := CountrySeedObj{}
	err := json.Unmarshal([]byte(file), &data)
	if err != nil {
		log.Fatal(err)
	}

	sqlStatement := `
		INSERT INTO countries(name,abbreviation)
		VALUES
		`

	for i, c := range data.Countries {
		if i != len(data.Countries)-1 {
			sqlStatement += "('" + c.Name + "','" + c.Abbreviation + "'),"
		} else {
			// avoiding comma ',' in final line
			sqlStatement += "('" + c.Name + "','" + c.Abbreviation + "') ON CONFLICT DO NOTHING"
		}
	}

	s.executeQuery(sqlStatement)
}

func (s *seed) executeQuery(query string) {
	_, err := s.database.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}

func readFileInDatabaseFolder(filename string) []byte {
	dir, _ := os.Getwd()

	var path string
	if strings.Contains(dir, "scripts") {
		path = "database/" + filename
	} else {
		mainPath := os.Getenv("APP_DIR")
		path = mainPath + "scripts/database/" + filename
	}

	log.Println(path)
	file, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	return file
}

func newSeed() Database {
	return &seed{}
}
