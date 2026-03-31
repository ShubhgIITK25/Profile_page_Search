package main

import (
	"net/http"
	"profile/search"
	"time"

	"github.com/gin-gonic/gin"
)

func SearchServer() *http.Server {
	r := gin.New()
	search.Router(r)
	server := &http.Server{
		Addr:         ":8081",
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	return server
}
