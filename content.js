window.addEventListener("keydown", e => {
        const speed = parseInt(e.key);
        if(speed > 0) {
            const video = document.querySelector("video");
            video.playbackRate = speed;
            e.stopPropagation();
        }
    }, true);