package connections

import (
	"fmt"
	"time"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
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
		log.Fatal("[DB ERROR] Missing database configuration")
	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
		host, user, password, dbname, port,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("[DB ERROR] Failed to connect database: %v", err)
	}

	// ✅ Get underlying sql.DB for pool config
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("[DB ERROR] Failed to get sql.DB: %v", err)
	}

	// ✅ Connection Pool
	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetConnMaxLifetime(5 * time.Minute)

	log.Info("[DB] Database connected successfully ✅")

	DB = db

	err = DB.AutoMigrate(&ProfileStr{})
	if err != nil {
		log.Fatalf("[DB ERROR] Failed to migrate database: %v", err)
	}
}
