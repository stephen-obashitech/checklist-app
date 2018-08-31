package main

import (
	"fmt"
	"net/http"
)

func HandleFinished(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DESPAFINITO")
}

func main() {
	http.HandleFunc("/finished", HandleFinished)

	fmt.Println("***Server Started!***")
	http.ListenAndServe("localhost:7890", nil)
}
