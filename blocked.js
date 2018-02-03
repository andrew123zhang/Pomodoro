//CALLED FROM BLOCKED.HTML ONLY
//CHANGES THE INFO DISPLAYED ON THE BLOCKED PAGE

function ticksToMinutes(t) {
    return Math.round(t/60);
}

//Ask for the amount of time left, every minute
var update = function() {
    chrome.runtime.sendMessage({
        messageType: "time", 
    }, function(response) {
        var time = response.workTime;
        if (time <= 0) {
            document.getElementById("msg").innerHTML = "You may now begin your break."; //update HTML file
        } else if (time <= 60) { 
            document.getElementById("time").innerHTML = time + " seconds left";
            window.setTimeout(update, 1000);
        } else {
            document.getElementById("time").innerHTML = ticksToMinutes(time) + " minutes left"; //update HTML file
            window.setTimeout(update, 30000);
        }
        
    });
};

update();