chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': "/options.html" } );
});

function setBadge(sender, value) {
    chrome.browserAction.setBadgeText({tabId: sender.tab.id,text: value});
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.type == "playback-rate-change") {
            const speed = request.speed;
            if(speed == 1) {
                setBadge(sender, '');
                return;
            }

            setBadge(sender, `${speed.toString().substring(0, 4)}X`);
        }
    }
  );