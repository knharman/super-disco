var currentDate = function() {
    var today = moment()
    var todayFormatted = today.format("dddd, MMMM Do")
    $("#currentDay").text(todayFormatted)
}

var taskEditorSetup = function(hour) {
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
    }).appendTo(taskInfo)

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

var calendarSetup = function() {
    var hoursArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
    for(i=0; i<hoursArr.length; i++) {
        let timeblock = $("<div>", {
            class: "row time-block",
            id: hoursArr[i] + "-timeblock"
        })

        let displayTime = $("<div>", {
            class: "col hour",
            id: hoursArr[i] + "-displayTime"
        }).text(hoursArr[i]).appendTo(timeblock)
        
        taskEditorSetup(hoursArr[i]).appendTo(timeblock)

        let saveTask = $("<div>", {
            class: "col saveBtn",
            id: hoursArr[i] + "-saveTask"
        }).text("Save").appendTo(timeblock)

        timeblock.appendTo($("#timeblocks"))
    }
    
}

currentDate();
calendarSetup();