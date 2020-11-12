package database

import (
	"bytes"
	"log"
	"os"
	"os/exec"
)

type migration struct {
}

func (m *migration) Execute(table string) {
	if table == "none" {
		log.Println("Running migrations..")
		runMigrationCMD()
		log.Println("Finished migrations...")
	}
}

func runMigrationCMD() error {
	cmd := exec.Command("cd", os.Getenv("APP_DIR"), "&&",
		"yarn", "typeorm:script-migration")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()

	return err
}

func newMigration() Database {
	return &migration{}
}
