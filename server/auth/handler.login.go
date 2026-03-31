package auth

import (
	"profile/connections"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var data connections.LogStruct

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid data format",
		})
	}

	c.JSON(200, gin.H{
		"Welcome to Pclub": data.Email,
	})
}
