// TODO switch on and off controls
var options = getDefaults();

// Initialize with the user's option settings
chrome.storage.local.get('options', ({ options: opts }) => {

    if(opts == null) return;

    options = opts;
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

    const video = document.querySelector("video");

    if(e.key == "ArrowRight") {
        e.stopPropagation();
        const seconds = options.skipPresets.seconds;
        video.currentTime += seconds;
        return;
    }

    if(e.key == "ArrowLeft") {
        e.stopPropagation();
        const seconds = options.skipPresets.seconds;
        video.currentTime -= seconds;
        return;
    }

    if(parseFloat(e.key) > 0) {
        e.stopPropagation();
        const speed = options.speedPresets[e.key];

        try {
            video.playbackRate = speed;
        } catch (error) {
            console.error(error);
        }
        
        chrome.runtime.sendMessage({type: "playback-rate-change", speed: speed});
    }
}, true);