var hoursArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

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
    .val(persistingTask)
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

var colorCode = function() {
    // responisble for color coding the cells
    // what is current hour of day
    // step through each hour, set correct color by comparing current hour and cell count

    var currentHourString = moment().format("ha") // 10am
    // var currentHourString = "12pm" <-- use this for testing
    var currentHourMoment = moment(currentHourString, "ha")

    for(i=0; i<hoursArr.length; i++) {
        $(hoursArr[i] + "-taskInfo").addClass("past")
        var hoursArrMoment = moment(hoursArr[i], "ha")
        if(hoursArrMoment.isBefore(currentHourMoment)) {
            $("#" + hoursArr[i] + "-taskInfo").addClass("past")
        } else if(currentHourString == hoursArr[i]) {
            $("#" + hoursArr[i] + "-taskInfo").addClass("present")
        } else {
            $("#" + hoursArr[i] + "-taskInfo").addClass("future")
        }
    }
}

var calendarSetup = function() {
    var persistingTasks = localStorage.getItem("workdayScheduler")
    if(!persistingTasks) {
        persistingTasks = ["","","","","","","",""]
    } else {
        persistingTasks = JSON.parse(persistingTasks)
    }

    for(i=0; i<hoursArr.length; i++) {
        let hour = hoursArr[i];
        
        let arrayIndex = i; // workaround for jQuery strange onClick behavior

        let timeblock = $("<div>", {
            class: "row time-block",
            id: hour + "-timeblock"
        })

        $("<div>", {
            class: "col hour",
            id: hour + "-displayTime"
        }).text(hour).appendTo(timeblock)
        
        taskEditorSetup(hour, persistingTasks[i]).appendTo(timeblock)
        $("<div>", {
            class: "col saveBtn",
            id: hour + "-saveTask"
        }).click(function() {
            var spanText =  $("#" + hour + "-taskSpan").text()
            putTaskLocalStorage(arrayIndex, spanText)
        }).append($("<i>", {
            class: "fas fa-save"
        })).appendTo(timeblock)

        timeblock.appendTo($("#timeblocks"))
    }
    setInterval(colorCode, 1000*60*10)
}

currentDate();
calendarSetup();
colorCode();