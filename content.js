const options = {};

// Initialize with the user's option settings
chrome.storage.local.get('options', data => {
    Object.assign(options, data.options);
});

chrome.storage.onChanged.addListener(changes => {
    for ({ newValue: newOptions } of Object.values(changes)) {
        Object.assign(options, newOptions);
    }
  });

window.addEventListener("keydown", e => {
        if(parseInt(e.key) > 0) {
            const video = document.querySelector("video");
            e.stopPropagation();

            try {
                video.playbackRate = options[e.key];
            } catch (error) {
                console.error(error);
            }
            
            console.log(`Video Speed: ${video.playbackRate}`);
        }
    }, true);