// setup event listeners
var finishButton = document.getElementById('finishButton')
finishButton.addEventListener('click', isFinished)

var addButton = document.getElementById('addButton')
addButton.addEventListener('click', addItem)

function isFinished () {
  var checkboxes = document.getElementsByClassName('form-check-input')

  // Identify if all checkboxes have been ticked
  var allFinished = true
  for (var i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      allFinished = false
      break
    }
  }

  // Report whether the user has completed their checklist
  if (allFinished) {
    document.getElementById('checklistFinished').innerHTML = 'Congratulations!'
  } else {
    document.getElementById('checklistFinished').innerHTML = 'Finish your checklist!'
  }
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
