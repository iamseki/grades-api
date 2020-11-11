package main

import (
	"api-scripts/database"
	"flag"
	"log"
	"sync"
)

func main() {
	var boolSeed bool
	var table string
	var wg sync.WaitGroup

	flag.BoolVar(&boolSeed, "seed", false, "Execute seed script if flag is passed e.g(-seed)")
	flag.StringVar(&table, "table", "none", "Table passed to execute query")

	flag.Parse()

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

	// Wait for all scripts to be executed
	wg.Wait()
	log.Println("All scripts were done")
}
