chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.type == "playback-rate-change") {
            chrome.browserAction.setBadgeText({tabId: sender.tab.id,text: `${
                request.speed.toString().substring(0, 4)
            }X`});
        }
    }
  );