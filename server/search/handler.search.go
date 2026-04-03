package search

import (
	"net/http"
	"profile/connections"

	"github.com/gin-gonic/gin"
)

func Routehealth(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"msg": "Yes It is healthy",
	})
}

func FindAll(c *gin.Context) {
	res, err := connections.FindAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Can't fetch from database",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"Data": res,
	})
}
