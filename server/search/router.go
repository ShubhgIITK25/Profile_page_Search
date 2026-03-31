package search

import "github.com/gin-gonic/gin"

func Router(r *gin.Engine) {
	r.Use(gin.Logger(), gin.Recovery())
	r.GET("/healthy", func(ctx *gin.Context) {

		ctx.JSON(200, gin.H{
			"msg": "Yes It is healthy",
		})
	})

}
