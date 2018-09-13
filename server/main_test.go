package main

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

// *************************
// * Test Helper Functions *
// *************************
func Equals(a, b Checklist) bool {
	if len(a.Items) != len(b.Items) {
		return false
	}

	for i := 0; i < len(a.Items); i++ {
		if !EqualsItem(a.Items[i], b.Items[i]) {
			return false
		}
	}

	return true
}

func EqualsItem(a, b ChecklistItem) bool {
	if a.Finished != b.Finished {
		return false
	}

	if a.Label != b.Label {
		return false
	}

	return true
}

// *********
// * Tests *
// *********
func TestHandleSave(t *testing.T) {
	SaveFileLocation = "testdata/checklist.json"

	c, _ := gin.CreateTestContext(httptest.NewRecorder())

	var ChecklistInput = Checklist{
		Items: []ChecklistItem{
			{Finished: true, Label: "one"},
			{Finished: true, Label: "two"},
			{Finished: false, Label: "three"},
		},
	}

	body, err := json.Marshal(ChecklistInput)
	if err != nil {
		t.Error(err)
	}

	c.Request = httptest.NewRequest("POST", "/save", bytes.NewReader(body))

	HandleSave(c)

	fileBody, err := ioutil.ReadFile(SaveFileLocation)
	if err != nil {
		t.Error(err)
	}

	var ChecklistOutput Checklist

	json.Unmarshal(fileBody, &ChecklistOutput)

	if !Equals(ChecklistInput, ChecklistOutput) {
		t.Error("Saved Checklist isn't the same as request cehcklist")
	}
}
