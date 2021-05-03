var lastConnected = Date.now();

window.addEventListener("message", (event) => {
    if(event.data.type == "change-speed") {
        messageActiveTab({type: event.data.type, speed: event.data.speed});
    } else if (event.data.type == "skip-back") {
        messageActiveTab({type: event.data.type});
    } else if (event.data.type == "play-pause") {
        messageActiveTab({type: event.data.type});
    } else if (event.data.type == "skip-forward") {
        messageActiveTab({type: event.data.type});
    } else if (event.data.type == "connection-test") {
        lastConnected = Date.now();
    }
}, false);

setInterval(() => {
    if((Date.now() - lastConnected) > 2000) {
        controllerFrame.src += '';
    }
}, 5000);

function messageActiveTab(message) {
    // Remember: the tab has to be active
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}