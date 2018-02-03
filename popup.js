//CALLED FROM POPUP.HTML ONLY

//Ask for the amount of time left
var update = function() {
    chrome.runtime.sendMessage({
        messageType: "time", 
    }, function(response) {
        var msg = response.message;
        document.getElementById("time").innerHTML = msg; //update HTML file
    });

    chrome.runtime.sendMessage({
        messageType: "pomodoroState", 
    }, function(response) {
        var state = response.state;
        document.getElementById("state").innerHTML = state; //update HTML file
    });
}

update();
window.setInterval(update, 30000) // update every half- minute
