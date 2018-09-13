// setup event listeners
var finishButton = document.getElementById('finishButton')
finishButton.addEventListener('click', isFinished)

var addButton = document.getElementById('addButton')
addButton.addEventListener('click', addItem)

var saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', saveChecklist)

var loadButton = document.getElementById('loadButton')
loadButton.addEventListener('click', loadChecklist)

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

  // create the json object
  var jsonCheckboxesFinal = {
    checkboxes: jsonCheckboxes
  }
  var finalJSON = JSON.stringify(jsonCheckboxesFinal)

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      isFinishedResponse(request)
    }
  }

  request.open('POST', 'http://127.0.0.1:7890/finished', true)
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(finalJSON)
}

// isFinishedResponse will read the response from the server
// and identify if the checklist is 'finished', along with
// making the user aware
function isFinishedResponse (request) {
  var json = request.responseText
  console.log(json)

  var obj = JSON.parse(json)
  console.log(obj)

  if (obj.Finished) {
    document.getElementById('checklistFinished').textContent = 'Congrats!'
  } else {
    document.getElementById('checklistFinished').textContent = 'MORE WORK'
  }
}

// TODO comment this function
// TODO rewrite this function
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

function saveChecklist () {
  // Create a javascript object containing the current state of the checklist
  var checklist = {}
  checklist.items = []

  // Extract all of the checklist items on our webpage
  var checklistItems = document.getElementsByClassName('form-check')

  // Add each checklist item into our checklist object
  for (var i = 0; i < checklistItems.length; i++) {
    var item = {}
    item.finished = checklistItems[i].getElementsByClassName('form-check-input')[0].checked
    item.label = checklistItems[i].getElementsByClassName('form-check-label')[0].textContent

    checklist.items.push(item)
  }

  // Send a 'save' request to the server
  var request = new XMLHttpRequest()

  request.open('POST', 'http://127.0.0.1:7890/save', true)
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(JSON.stringify(checklist))
}

function loadChecklist () {

}
