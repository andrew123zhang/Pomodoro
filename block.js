//this runs once on each page


function block() { 
    //Good Programming practice: Encapsulate important, 
    //    distinct actions into functions
    window.location = chrome.extension.getURL("blocked.html"); //Blocks current site
}

//Send a message
function check() {
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

//Perpetually check if break time is over
check()
window.setInterval(check, 10000); //Runs check infinitely
