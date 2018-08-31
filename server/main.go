package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Checkboxes struct {
	Boxes []bool `json:"checkboxes"`
}

func HandleFinished(c *gin.Context) {
	var boxes Checkboxes
	err := c.BindJSON(&boxes)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(boxes)

	c.JSON(200, true)
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/finished", HandleFinished)

	fmt.Println("***Server Started!***")

	r.Run("127.0.0.1:7890")
}
