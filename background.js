function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const appID = uuidv4();

function setBadge(sender, value) {
    chrome.browserAction.setBadgeText({tabId: sender.tab.id,text: value});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "playback-rate-change") {
            const speed = request.speed;
            if(speed == 1) {
                setBadge(sender, '');
                return;
            }

            setBadge(sender, `${speed.toString().substring(0, 4)}X`);
            return;
        }
        if (request.type == "get-id") {
            sendResponse(appID);
            return;
        }
    }
  );