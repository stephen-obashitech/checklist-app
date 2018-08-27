function isFinished () { // eslint-disable-line no-unused-vars
  var checkboxes = document.getElementsByClassName('form-check-input')
  var allFinished = true
  for (var i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      allFinished = false
      break
    }
  }

  if (allFinished) {
    document.getElementById('checklistFinished').innerHTML = 'Congratulations!'
  } else {
    document.getElementById('checklistFinished').innerHTML = 'Finish your checklist!'
  }
}

function addItem () { // eslint-disable-line no-unused-vars
  var userInput = document.getElementById('inputChecklistItem')

  var checklistDiv = document.createElement('div')
  checklistDiv.setAttribute('class', 'form-group form-check')

  // Create input checkbox for checklist
  var checklistDivInput = document.createElement('input')
  checklistDivInput.setAttribute('type', 'checkbox')
  checklistDivInput.setAttribute('class', 'form-check-input')
  checklistDiv.appendChild(checklistDivInput)

  // Create label for checkbox
  var checklistLabel = document.createElement('label')
  var checklistLabelText = document.createTextNode(userInput.value)
  checklistLabel.setAttribute('class', 'form-check-label')
  checklistLabel.appendChild(checklistLabelText)

  checklistDiv.appendChild(checklistLabel)

  finishButton = document.getElementById('finishButton')
  console.log(finishButton)

  parentNode = document.getElementById('listChecklistForm')
  console.log(parentNode)
  parentNode.insertBefore(checklistDiv, finishButton)
}
