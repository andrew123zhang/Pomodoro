//This runs in the background all the time
//This tells everything else what to do

var ticks = 0; //how many seconds have passed since we begun the app (opened chrome)
var pomodoro = {
    workTime: 25*60, //in ticks
    breakTime: 5*60 //minutes * ticks per minute
}

var useWhitelist = false;
var blacklist = ["www.reddit.com"]
var whitelist = ["www.google.com"]

var currentState = "work" //or "break"

window.setInterval(function() {
    ticks += 1;
    if (currentState == "break") {
        if (ticks >= pomodoro.breakTime) {
            ticks = 0;
            currentState = "work";
        }
    }
}, 1000);

function blocked(hostname) {
    //TODO: handle whitelists, blacklists, etc
    //Regex!
    if (useWhitelist) {
        return true;
    } else {
        return blacklist.indexOf(hostname) > -1;
    }
}

function ticksToMinutes(t) {
    return Math.round(t/60);
}

//Listen for messages, and then send back data
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.messageType == "block") {
            if (blocked(request.hostname)) {
                if (currentState == "work") {
                    if (ticks >= pomodoro.workTime) {
                        //Begin our break
                        ticks = 0;
                        currentState = "break"
                        sendResponse({shouldBlock: "no"});
                    } else {
                        //The work period is not over
                        sendResponse({shouldBlock: "yes"});
                    }
                } else {
                    //Allow if we are in a break state
                    sendResponse({shouldBlock: "no"});
                }
            } else {
                //never block sites that aren't blacklisted
                sendResponse({shouldBlock: "no"});
            }
        } else if (request.messageType == "time") {
            var time;
            var result = "";
            if (currentState == "work") {
                time = pomodoro.workTime - ticks;
                if (time <= 0) {
                    time = 0;
                    result = "You may begin your break"
                } else {
                    if (time <= 60) {
                        result = time + " seconds of work left"
                    } else {
                        result = ticksToMinutes(time) + " minutes of work left"
                    }
                }
            } else if (currentState == "break") {
                time = pomodoro.breakTime - ticks;
                if (time <= 60) {
                    result = time + " seconds of break left"
                } else {
                    result = ticksToMinutes(time) + " minutes of break left"
                }
            }
            sendResponse({
                message: result, 
                state: currentState,
                ticks: time,
                workTime: pomodoro.workTime - ticks
            });
        }
        sendResponse({}); 
    }
);