// In-page cache of the user's options
const options = defaultOpts;

// Initialize with the user's option settings
chrome.storage.local.get('options', data => {
    Object.assign(options, data.options);
    for (let [key, value] of Object.entries(options)) {
        container[`speed${key}`].value = value;
    }
});

container.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const name = input.name,
              value = input.value;

        if(value == null || value == "") return;
        
        options[name.charAt(name.length - 1)] = value;
        chrome.storage.local.set({options});
    });
});