//CALLED FROM BLOCKED.HTML ONLY
//CHANGES THE INFO DISPLAYED ON THE BLOCKED PAGE

//Ask for the amount of time left, every minute
var update = function() {
    chrome.runtime.sendMessage({
        messageType: "workTime", 
    }, function(response) {
        var time = response.timeLeft;
        document.getElementById("time").innerHTML = time; //update HTML file
    });
};

update();
window.setInterval(update, 1000)