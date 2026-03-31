package main

func main() {
	go func() {
		Authserver().ListenAndServe()
	}()
	go func() {
		SearchServer().ListenAndServe()
	}()
	select {}
}
