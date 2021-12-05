var currentDate = function() {
    var today = moment()
    var todayFormatted = today.format("dddd, MMMM Do")
    $("#currentDay").text(todayFormatted)
}

var taskEditorSetup = function(hour, persistingTask) {
    let taskInfo = $("<div>", {
        class: "col-9 d-flex justify-content-start",
        id: hour + "-taskInfo"
    }).click(function(){
        $("#" + hour + "-taskSpan").hide();
        $("#" + hour + "-textArea").show().select()
    })

    $("<span>", {
        class: "taskText description",
        id: hour + "-taskSpan"
    }).text(persistingTask).appendTo(taskInfo)

    $("<textarea>", {
        class: "editTask w-100 h-100",
        id: hour + "-textArea"
    }).blur(function(){
        $(this).hide();
        var currentTextAreaText = $(this).val()
        $("#" + hour + "-taskSpan").text(currentTextAreaText).show()
    })
    .hide()
    .appendTo(taskInfo)

    return taskInfo
}

var putTaskLocalStorage = function(hourIndex, text) {
    var existing = localStorage.getItem("workdayScheduler")
    if(!existing) {
        existing = ["","","","","","","",""]
    } else {
        existing = JSON.parse(existing)
    }
    // existing will either be array of empty strings or legit task data
    existing[hourIndex] = text
    console.log(text)
    localStorage.setItem("workdayScheduler", JSON.stringify(existing))
}

var calendarSetup = function() {
    var hoursArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
    var persistingTasks =  localStorage.getItem("workdayScheduler")
    persistingTasks = JSON.parse(persistingTasks)

    for(i=0; i<hoursArr.length; i++) {
        let hour = hoursArr[i];
        
        let arrayIndex = i; // workaround for jQuery strange onClick behavior

        let timeblock = $("<div>", {
            class: "row time-block",
            id: hour + "-timeblock"
        })

        let displayTime = $("<div>", {
            class: "col hour",
            id: hour + "-displayTime"
        }).text(hour).appendTo(timeblock)
        
        taskEditorSetup(hour, persistingTasks[i]).appendTo(timeblock)

        let saveTask = $("<div>", {
            class: "col saveBtn",
            id: hour + "-saveTask"
        }).click(function() {
            var spanText =  $("#" + hour + "-taskSpan").text()
            putTaskLocalStorage(arrayIndex, spanText)
        }).text("Save").appendTo(timeblock)

        timeblock.appendTo($("#timeblocks"))
    }
    
}

currentDate();
calendarSetup();