package auth

import (
	"net/http"
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
	var data connections.LogStruct

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err": "Invalid data format",
		})
		return
	}

	if data.Email == "" || data.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"err": "email and password are required",
		})
		return
	}

	err := connections.SignUp(data)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"msg": "Signed up successfully",
	})
}
