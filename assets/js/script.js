var currentDate = function() {
    var today = moment()
    var todayFormatted = today.format("dddd, MMMM Do")
    $("#currentDay").text(todayFormatted)
}

var taskEditorSetup = function(hour) {
    let taskInfo = $("<div>", {
        class: "col",
        id: hour + "-taskInfo"
    })

    $("<span>", {
        class: "taskText",
        id: hour + "-taskSpan"
    }).click(function(){
        $(this).hide();
        $("#" + hour + "-textArea").show().select()
    })
    .text("placeholder")
    .appendTo(taskInfo)

    $("<textarea>", {
        class: "editTask",
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

var calendarSetup = function() {
    var hoursArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
    for(i=0; i<hoursArr.length; i++) {
        let timeblock = $("<div>", {
            class: "row timeblock",
            id: hoursArr[i] + "-timeblock"
        })

        let displayTime = $("<div>", {
            class: "col",
            id: hoursArr[i] + "-displayTime"
        }).text(hoursArr[i]).appendTo(timeblock)
        
        taskEditorSetup(hoursArr[i]).appendTo(timeblock)

        let saveTask = $("<div>", {
            class: "col",
            id: hoursArr[i] + "-saveTask"
        }).text("Save").appendTo(timeblock)

        timeblock.appendTo($("#timeblocks"))
    }
    
}

currentDate();
calendarSetup();