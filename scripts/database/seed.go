package database

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type seed struct {
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

func (s *seed) Execute(table string) {
	db, err := sql.Open("postgres", os.Getenv("POSTGRES_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// check if the passed table had some data
	// if table = none seed all stuff
	if table == "none" {
		log.Printf("Executing seed in all tables\n")

		mainPath, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}

		s.seedCountries(db, mainPath)

		log.Printf("Finished seed in all tables\n")
	}
}

func (s *seed) seedCountries(db *sql.DB, fileJSONPath string) {
	file, err := ioutil.ReadFile(fileJSONPath + "/database/countries_seed.json")
	if err != nil {
		log.Fatal(err)
	}
	data := CountrySeedObj{}

	_ = json.Unmarshal([]byte(file), &data)

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

	_, err = db.Exec(sqlStatement)
	if err != nil {
		log.Fatal(err)
	}
}

func newSeed() Database {
	return &seed{}
}
