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

func TestHandleLoad(t *testing.T) {
	SaveFileLocation = "testdata/load-checklist.json"

	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)

	c.Request = httptest.NewRequest("POST", "/load", bytes.NewReader([]byte("")))

	HandleLoad(c)

	// Load response into checklist struct?
	jsonResponse := &Checklist{}
	err := json.Unmarshal(response.Body.Bytes(), jsonResponse)
	if err != nil {
		t.Error(err)
	}

	// Ensure it meets our standards
	expectedChecklist := &Checklist{Items: []ChecklistItem{
		{Finished: true, Label: "tidy desk"},
		{Finished: true, Label: "polish desk"},
		{Finished: false, Label: "repaint desk"},
	}}

	if !Equals(*expectedChecklist, *jsonResponse) {
		t.Error("Expected Checklist:", expectedChecklist)
		t.Error("Actual Checklist:", jsonResponse)
	}
}
