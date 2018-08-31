// setup event listeners
var finishButton = document.getElementById('finishButton')
finishButton.addEventListener('click', isFinished)

var addButton = document.getElementById('addButton')
addButton.addEventListener('click', addItem)

// isFinished will check to see if a checklist has been completed.
// It gathers data into json, then sends a request to the backend to
// ensure it actually has completed. This is excessive, but is primarily
// for learning purposes
function isFinished () {
  var checkboxes = document.getElementsByClassName('form-check-input')

  var jsonCheckboxes = []
  for (var i = 0; i < checkboxes.length; i++) {
    jsonCheckboxes.push(checkboxes[i].checked)
  }

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      // DO SOMETHING WITH THE RESPONSE
      console.log('REQUEST RECEIVED')
    }
  }

  request.open('POST', 'http://127.0.0.1:7890/finished', true)
  request.setRequestHeader('Content-Type', 'application/json')

  // create the json object
  var jsonCheckboxesFinal = {
    checkboxes: jsonCheckboxes
  }
  var finalJSON = JSON.stringify(jsonCheckboxesFinal)
  console.log(finalJSON)
  request.send(finalJSON)
  console.log('REQUEST SENT')

  console.log(jsonCheckboxes)
}

function addItem () {
  var userInput = document.getElementById('inputChecklistItem').value

  // create a new checklist div
  var checklistDiv = document.createElement('div')
  checklistDiv.setAttribute('class', 'form-group form-check')

  // Create input checkbox for checklist
  var checklistDivInput = document.createElement('input')
  checklistDivInput.setAttribute('type', 'checkbox')
  checklistDivInput.setAttribute('class', 'form-check-input')
  checklistDiv.appendChild(checklistDivInput)

  // Create label for checkbox
  var checklistLabel = document.createElement('label')
  var checklistLabelText = document.createTextNode(userInput)
  checklistLabel.setAttribute('class', 'form-check-label')
  checklistLabel.appendChild(checklistLabelText)
  checklistDiv.appendChild(checklistLabel)

  // Insert the new checklist item before the finish button
  var finishButton = document.getElementById('finishButton')
  var parentNode = document.getElementById('listChecklistForm')
  parentNode.insertBefore(checklistDiv, finishButton)
}
