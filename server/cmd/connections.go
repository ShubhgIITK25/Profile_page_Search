package main

import "profile/connections"

func init() {
	connections.Viperconfig()
	connections.Dbconnect()
}
