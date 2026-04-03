package auth

import "github.com/gin-gonic/gin"

func Router(r *gin.Engine) {
	r.Use(gin.Logger(), gin.Recovery())

	auth := r.Group("/api/auth")
	{
		auth.POST("/check-exist", Checkexist)
		auth.POST("/signup", Signup)
		auth.POST("/login", Login)
	}

}
