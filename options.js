// In-page cache of the user's options
const options = defaultOpts;

function reset() {
    container.querySelectorAll("input").forEach((input, i) => {
        Object.assign(options, defaultOpts);
        input.value = options[i + 1];
        chrome.storage.local.set({options});
    });
}

// Initialize with the user's option settings
chrome.storage.local.get('options', data => {
    Object.assign(options, data.options);
    for (let [key, value] of Object.entries(options)) {
        container[`speed${key}`].value = value;
    }
});

container.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const name = input.name;

        var value = parseFloat(input.value);

        if(value == null || value == "") return;

        if(value > 16) {
            value = input.value = 16;
        } else if (value <= 0) {
            value = input.value = 1;
        }
        
        options[name.charAt(name.length - 1)] = value;
        chrome.storage.local.set({options});
    });
});