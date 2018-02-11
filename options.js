//Works on options.html

var whitelist = [];
var blacklist = [];

function addItem(item) {
    var arrElem = "<div class='arrElem'><span class='siteName'>" + item + "</span><button class='delButton'>X</button></div>";
    $("#listContainer").append(arrElem);
}

function updateLists(arr) {
    $("#listContainer").empty();

    for (var i = 0; i < arr.length; i++) {
        addItem(arr[i]);
    }
}

//Load current values
chrome.runtime.sendMessage({
    messageType: "getPomodoro", 
}, function(response) {
    //Fill form values with data
    $("#workTime").val(response.workTime/60);
    $("#breakTime").val(response.breakTime/60);

    whitelist = response.whitelist;
    blacklist = response.blacklist;

    if (response.useWhitelist) {
        $("#useWhitelist").prop("checked", true);
        updateLists(response.whitelist);
    } else {
        $("#useWhitelist").prop("checked", false);
        updateLists(response.blacklist);
    }

});

$("#useWhitelist").change(function() {
    chrome.runtime.sendMessage({
        messageType: "getPomodoro", 
    }, function(response) {
        if ($("#useWhitelist").prop("checked")) {
            updateLists(response.whitelist);
        } else {
            updateLists(response.blacklist);
        }
    });
});

$("#listContainer").on("click", ".delButton", function() {
    console.log('hi')
    $(this).closest(".arrElem").remove();
});

//gets list from HTML, generated elements
function getList() {
    var result = [];
    $("#listContainer").children('.arrElem').each(function () {
        result.push($(this).children()[0].innerHTML);
    });
    return result;
}

$("#addItemButton").click(function() {
    var val = $("#addItem").val();
    if (val.length > 3) {
        addItem($("#addItem").val());
        $("#addItem").val("");
    }
});

$("#save").click(function() {
    if ($("#useWhitelist").prop("checked")) {
        whitelist = getList();
    } else {
        blacklist = getList();
    }

    var pom = {
        foo: "jer",
        workTime: $("#workTime").val() * 60,
        breakTime: $("#breakTime").val() * 60,
        useWhitelist: $("#useWhitelist").prop("checked"),
        blacklist: blacklist,
        whitelist: whitelist
    }

    chrome.runtime.sendMessage({
        messageType: "updatePomodoro",
        pomodoro: pom
    });
});
