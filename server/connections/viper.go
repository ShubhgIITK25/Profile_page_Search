package connections

import (
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func Viperconfig() {
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.SetConfigName("config")

	err := viper.ReadInConfig()
	if err != nil {
		logrus.Fatalf("Fatal Error in config %s \n", err)
	}

	viper.SetConfigName("secret")
	err = viper.MergeInConfig()
	if err != nil {
		logrus.Fatalf("Fatal Error in config %s \n", err)
	}
}
