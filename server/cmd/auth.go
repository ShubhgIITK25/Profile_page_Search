package main

import (
	"net/http"
	"profile/auth"
	"time"

	"github.com/gin-gonic/gin"
)

func Authserver() *http.Server {
	r := gin.New()
	auth.Router(r)
	server := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	return server
}
