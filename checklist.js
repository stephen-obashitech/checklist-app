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
  var input = document.getElementById('inputChecklistItem')

  var checklistDiv = document.createElement('div')
  var checklistDivInput = document.createElement('input')
  checklistDivInput.setAttribute('type', 'checkbox')
  checklistDiv.appendChild(checklistDivInput)

  var checklistLabel = document.createElement('label')
  var checklistLabelText = document.createTextNode(input.value)
  checklistLabel.appendChild(checklistLabelText)

  checklistDiv.appendChild(checklistLabel)

  finishButton = document.getElementById('finishButton')
  console.log(finishButton)

  parentNode = document.getElementById('listChecklistForm')
  console.log(parentNode)
  parentNode.insertBefore(checklistDiv, finishButton)
}
