// In-page cache of the user's options
const options = { ...defaultOpts };

var skip = defaultSkip;

function reset() {
    container.querySelectorAll("input").forEach((input, i) => {
        Object.assign(options, defaultOpts);
        input.value = options[i + 1];
    });
    chrome.storage.local.set({options});
}

// Initialize with the user's option settings
chrome.storage.local.get('options', data => {
    Object.assign(options, data.options);
    for (let [key, value] of Object.entries(options)) {
        container[`speed${key}`].value = value;
    }
});

chrome.storage.local.get('skipValue', data => {
    skip = data;
});

resetButton.addEventListener("click", () => {
    reset();
});

container.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const name = input.name;

        var value = parseFloat(input.value);

        if(value == null || value === "") return;

        if(value > 16) {
            alert("Values higher than 16 are not permitted");
            value = input.value = 16;
        } else if (value <= 0) {
            alert("Values zero or less are not permitted");
            value = input.value = 1;
        }
        
        options[name.charAt(name.length - 1)] = value;
        chrome.storage.local.set({options});
    });
});

skipForm.skipSeconds.addEventListener("input", e => {
    const skipValue = parseFloat(e.target.value) ?? skip;
    chrome.storage.local.set({skipValue});
});