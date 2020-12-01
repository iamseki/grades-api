package database

import (
	"log"
	"os"
	"os/exec"
)

type migration struct {
}

func (m *migration) Execute(table string) {
	if table == "none" {
		log.Println("Running script migrations..")
		err := runMigrationCMD()
		if err != nil {
			log.Fatalln(err)
		}
		log.Println("Finished script migrations...")
	}
}

func runMigrationCMD() error {
	os.Chdir(os.Getenv("APP_DIR"))
	cmd := exec.Command("yarn", "typeorm:script-migration")

	out, err := cmd.CombinedOutput()

	//err := cmd.Run()

	log.Println(string(out))

	return err
}

func newMigration() Database {
	return &migration{}
}
