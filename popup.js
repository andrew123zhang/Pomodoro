//CALLED FROM POPUP.HTML ONLY

//Ask for the amount of time left
var updatePopup = function() {
    chrome.runtime.sendMessage({
        messageType: "time", 
    }, function(response) {
        var msg = response.message;
        document.getElementById("time").innerHTML = msg; //update HTML file
        document.getElementById("state").innerHTML = response.state; //update HTML file
        if (response.ticks <= 60) {
            window.setTimeout(updatePopup, 1000);
        } else {
            window.setInterval(updatePopup, 30000) // update every half- minute
        }
    });
}

updatePopup();
