package database

import (
	"bytes"
	"os"
	"os/exec"
)

type migration struct {
}

func (m *migration) Execute(table string) {

}

func runMigrationCMD() error {
	cmd := exec.Command("cd", os.Getenv("APP_DIR"), "&&",
		"yarn", "add", "ts-node", "tsconfig-paths", "&&",
		"yarn", "typeorm", "migration:run")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()

	return err
}

func newMigration() Database {
	return &migration{}
}
