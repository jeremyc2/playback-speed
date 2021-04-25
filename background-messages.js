window.addEventListener("message", (event) => {
    if(event.data.type == "change-speed") {
        changeSpeed(event.data.speed);
    }
}, false);

function changeSpeed(speed) {
    // Remember: the tab has to be active
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "change-speed", speed});
    });
}