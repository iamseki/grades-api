package database

// Database bla
type Database interface {
	Execute(table string)
}

type factoryType string

// bla
const (
	GetSeed      factoryType = "seed"
	GetOther                 = "other"
	GetMigration             = "migration"
)

// Factory of Database Package
func Factory(executor factoryType) Database {
	switch executor {
	case GetSeed:
		return newSeed()
	case GetOther:
		return newSeed()
	case GetMigration:
		return newMigration()
	default:
		return newSeed()
	}
}
