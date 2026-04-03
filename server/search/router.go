package search

import "github.com/gin-gonic/gin"

func Router(r *gin.Engine) {
	r.Use(gin.Logger(), gin.Recovery())
	r.GET("/search", FindAll)
	
}
