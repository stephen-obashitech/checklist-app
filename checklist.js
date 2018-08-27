function isFinished() {
    var checkboxes = document.getElementsByClassName("form-check-input");
    var allFinished = true;
    for (var i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            allFinished = false;
            break;
        }
    }

    if (allFinished) {
        document.getElementById("checklistFinished").innerHTML = "Congratulations!";
    } else {
        document.getElementById("checklistFinished").innerHTML = "Finish your checklist!";
    }
}