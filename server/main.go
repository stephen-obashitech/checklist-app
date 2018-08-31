package main

import (
	"fmt"
	"log"
	"net/http"
)

func HandleFinished(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Println("DESPAFINITO")

	w.Write([]byte("<a>hello</a>"))
}

func main() {
	http.HandleFunc("/finished", HandleFinished)

	fmt.Println("***Server Started!***")
	log.Fatal(http.ListenAndServe("127.0.0.1:7890", nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
