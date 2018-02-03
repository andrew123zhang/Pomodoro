//CALLED FROM POPUP.HTML ONLY

//Ask for the amount of time left
chrome.runtime.sendMessage({
    messageType: "time", 
}, function(response) {
    var time = response.timeLeft;
    document.getElementById("time").innerHTML = time; //update HTML file
});

chrome.runtime.sendMessage({
    messageType: "pomodoroState", 
}, function(response) {
    var state = response.state;
    document.getElementById("state").innerHTML = state; //update HTML file
});