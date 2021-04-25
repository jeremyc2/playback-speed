// TODO switch on and off controls
var options = getDefaults();

// Initialize with the user's option settings
chrome.storage.local.get('options', res => {

    if(res.options == null) return;

    options = res.options;
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

    var video = document.querySelector("video");

    if(options.skipPresets.enabled && e.key == "ArrowRight") {
        e.stopPropagation();
        const seconds = options.skipPresets.seconds;
        video.currentTime += seconds;
        return;
    }

    if(options.skipPresets.enabled && e.key == "ArrowLeft") {
        e.stopPropagation();
        const seconds = options.skipPresets.seconds;
        video.currentTime -= seconds;
        return;
    }

    e.stopPropagation();
    changeSpeed(parseFloat(e.key)); 
}, true);

chrome.runtime.onMessage.addListener(
    function(request) {
        changeSpeed(request);
    }
);

function changeSpeed(speedIndex) {
    var video = document.querySelector("video");

    if(speedIndex > 0) {
        const speed = options.speedPresets[speedIndex];

        try {
            video.playbackRate = speed;
        } catch (error) {
            console.error(error);
        }
        
        chrome.runtime.sendMessage({type: "playback-rate-change", speed: speed});
    }
}