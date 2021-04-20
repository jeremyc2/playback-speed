// In-page cache of the user's options
const options = {};

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
        options[name.charAt(name.length - 1)] = input.value;
        chrome.storage.local.set({options});
    });
});