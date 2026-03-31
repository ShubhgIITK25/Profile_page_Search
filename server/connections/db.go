package connections

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

var DB *sql.DB
var log = logrus.New()

func init() {
	log.SetLevel(logrus.DebugLevel)
}

func Dbconnect() {
	log.Info("[DB] Starting database connection...")

	user := viper.GetString("db.user")
	password := viper.GetString("db.password")
	dbname := viper.GetString("db.dbname")
	host := viper.GetString("db.host")
	port := viper.GetString("db.port")

	if user == "" || password == "" || dbname == "" || host == "" || port == "" {
		log.Fatalf("[DB ERROR] Missing database configuration - user: %s, dbname: %s, host: %s, port: %s", user, dbname, host, port)
	}

	Connecstr := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable", user, password, dbname, host, port)
	log.Infof("[DB] Connection string: user=%s password=*** dbname=%s host=%s port=%s", user, dbname, host, port)

	db, err := sql.Open("postgres", Connecstr)
	if err != nil {
		log.Fatalf("[DB ERROR] Failed to open database: %v", err)
	}

	log.Info("[DB] Attempting to ping database...")
	err = db.Ping()

	if err != nil {
		log.Fatalf("[DB ERROR] Failed to ping database: %v", err)
	}
	log.Info("[DB] Database connected successfully")

	DB = db
}
