// TODO switch on and off controls
var options = getDefaults();
console.log(options);

// Initialize with the user's option settings
chrome.storage.local.get('options', data => {
    if(JSON.stringify(data) == "{}") return;

    console.log(data);
    options = data.options;
});

chrome.storage.onChanged.addListener(changes => {
    for ({ newValue: newOptions } of Object.values(changes)) {
        options = newOptions;
    }
});

window.addEventListener("keydown", e => {
    const activeElement = document.activeElement,
          activeTagName = activeElement.tagName;

    if(activeTagName == "INPUT" ||
        activeTagName == "TEXTAREA" ||
        activeElement.isContentEditable) {
        console.log("Focus is on input element.");
        return;
    }

    if(parseFloat(e.key) > 0) {
        e.stopPropagation();
        const video = document.querySelector("video"),
              speed = options.speedPresets[e.key];

        try {
            video.playbackRate = speed;
        } catch (error) {
            console.error(error);
        }
        
        chrome.runtime.sendMessage({type: "playback-rate-change", speed: speed});
    }
}, true);