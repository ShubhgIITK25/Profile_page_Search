package search

import "github.com/gin-gonic/gin"

func Routehealth(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"msg": "Yes It is healthy",
	})
}
