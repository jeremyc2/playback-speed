window.addEventListener("keydown", e => {
        const number = parseInt(e.key);
        if(number > 0) {
            const video = document.querySelector("video");
            video.playbackRate = number;
            e.stopPropagation();
        }
    }, true);