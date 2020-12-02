package main

import (
	"api-scripts/database"
	"flag"
	"log"
	"sync"
	"time"
)

func main() {
	var boolSeed bool
	var boolMigration bool
	var table string
	var delay int
	var wg sync.WaitGroup

	flag.BoolVar(&boolSeed, "seed", false, "Execute seed script if flag is passed e.g(-seed)")
	flag.BoolVar(&boolMigration, "migration", false, "Execute migration script if flag is passed e.g(-migration)")
	flag.StringVar(&table, "table", "none", "Table passed to execute query")
	flag.IntVar(&delay, "delay", 1, "Delay to wait to start the go program")

	flag.Parse()

	time.Sleep(time.Duration(delay) * time.Second)
	// execute seed script if running with -seed -table=name
	// go run main.go -seed will populate all .json availables
	if boolSeed {
		wg.Add(1)
		go func(wg *sync.WaitGroup) {
			seed := database.Factory(database.GetSeed)
			seed.Execute(table)
			wg.Done()
		}(&wg)
	}
	if boolMigration {
		wg.Add(1)
		go func(wg *sync.WaitGroup) {
			migration := database.Factory(database.GetMigration)
			migration.Execute(table)
			wg.Done()
		}(&wg)
	}

	// Wait for all scripts to be executed
	wg.Wait()
	log.Println("All scripts were done")
}
