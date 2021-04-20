const options = {};

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
            
            alert(video.playbackRate);
        }
    }, true);