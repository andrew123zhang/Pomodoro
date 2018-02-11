//this runs once on each page, and blocks the site if it is to be blocked. Executes the block.

function block() { 
    //    good programming practice: Encapsulate important, 
    //    distinct actions into functions
    window.location = chrome.extension.getURL("blocked.html"); //Blocks current site by redirecting to local html file
}

function check() { //Sends a message to pomodoro.js
    chrome.runtime.sendMessage({
        messageType: "block", 
        hostname: window.location.hostname
    }, function(response) {
        var res = response.shouldBlock;
        if (res == "yes") {
            block();
        }
    });
}

check(); //Perpetually check if break time is over

window.setInterval(check, 10000); //Runs check infinitely
document.onmousemove = function(e) {
    check();
}