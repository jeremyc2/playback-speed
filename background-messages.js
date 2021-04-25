window.addEventListener("message", (event) => {
    changeSpeed(event.data);
}, false);

function changeSpeed(speed) {
    // Remember: the tab has to be active
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, speed);
    });
}