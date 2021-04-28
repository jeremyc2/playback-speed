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

    if(options.skipPresets.enabled && e.key == "ArrowLeft") {
        e.stopPropagation();
        skipBack();
        return;
    }

    if(options.skipPresets.enabled && e.key == "ArrowRight") {
        e.stopPropagation();
        skipForward()
        return;
    }

    if(!isNaN(parseInt(e.key))) {
        e.stopPropagation();
        changeSpeed(parseInt(e.key)); 
        return;
    }

}, true);

chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.type == "change-speed") {
            changeSpeed(request.speed);
        } else if (request.type == "skip-back") {
            skipBack();
        } else if (request.type == "play-pause") {
            togglePlayPause();
        } else if (request.type == "skip-forward") {
            skipForward();
        }
    }
);

function changeSpeed(speedIndex) {
    var video = document.querySelector("video");

    if(speedIndex > 0 && speedIndex < 9) {
        const speed = options.speedPresets[speedIndex];

        try {
            video.playbackRate = speed;
        } catch (error) {
            console.error(error);
        }
        
        chrome.runtime.sendMessage({type: "playback-rate-change", speed: speed});
    }
}

function skipBack() {
    var video = document.querySelector("video");

    const seconds = options.skipPresets.seconds;
    video.currentTime -= seconds;
}

function skipForward() {
    var video = document.querySelector("video");

    const seconds = options.skipPresets.seconds;
    video.currentTime += seconds;
}

function togglePlayPause() {
    var video = document.querySelector("video");

    if(video.paused == true) {
        video.play();
    } else {
        video.pause();
    }
}