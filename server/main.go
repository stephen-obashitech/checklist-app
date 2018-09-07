package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"os"
	"io/ioutil"
)

type Checkboxes struct {
	Boxes []bool `json:"checkboxes"`
}

type FinishedResponse struct {
	Finished bool
}

func HandleFinished(c *gin.Context) {
	var boxes Checkboxes

	err := c.BindJSON(&boxes)
	if err != nil {
		fmt.Println(err)
	}

	allFinished := true
	for _, box := range boxes.Boxes {
		if !box {
			allFinished = false
			break
		}
	}
	response := &FinishedResponse{Finished: allFinished}

	c.JSON(200, response)
}

func HandleSave(c *gin.Context) {
	body,err  := ioutil.ReadAll(c.Request.Body)

	if err != nil {
		fmt.Println(err)
	}

	saveToFile(string(body))
}

func saveToFile(checklistState string) {
	f, err := os.Create("checklist.json")
	if err != nil {
		fmt.Println(err)
	}
	defer f.Close()

	_, err = f.WriteString(checklistState)
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/finished", HandleFinished)
	r.POST("/save", HandleSave)
	// TODO save file handler

	fmt.Println("***Server Started!***")

	r.Run("127.0.0.1:7890")
}
