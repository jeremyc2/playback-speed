const options = defaultOpts;

var title;

document.addEventListener("DOMContentLoaded", () => {
    title = document.title;
})

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
        e.stopPropagation();
        const video = document.querySelector("video"),
              speed = options[e.key] ?? defaultOpts[e.key];

        try {
            video.playbackRate = speed;
        } catch (error) {
            console.error(error);
        }
        
        document.title = `${speed}X ${title}`;
    }
}, true);