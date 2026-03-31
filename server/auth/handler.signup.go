package auth

import (
	"profile/connections"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

var handlerLog = logrus.New()

func init() {
	handlerLog.SetLevel(logrus.DebugLevel)
}

func Checkexist(c *gin.Context) {
	var data connections.LogStruct

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": "Invalid data"})
		return
	}

	exists, err := connections.Checkexist(data.Email)
	if err != nil {
		c.JSON(500, gin.H{"error": "Database error"})
		return
	}

	c.JSON(200, gin.H{
		"exists": exists,
	})
}

func Signup(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "Signed UP",
	})
}

func Health(c *gin.Context) {
	c.JSON(200, gin.H{
		"Status": "Healthy",
	})
}
