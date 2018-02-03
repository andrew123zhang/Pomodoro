//this runs once on each page


//Send a message
chrome.runtime.sendMessage({
    messageType: "block", 
    hostname: window.location.hostname
}, function(response) {
    var res = response.shouldBlock;
    if (res == "yes") {
        block();
    }
});

function block() { 
    //Good Programming practice: Encapsulate important, 
    //    distinct actions into functions
    window.location = chrome.extension.getURL("blocked.html"); //Blocks current site
}

//todo:
//Perpetually check if break time is over