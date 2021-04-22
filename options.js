// In-page cache of the user's options
var options = getDefaults();

function saveOptions() {
    chrome.storage.local.set({options});
}

function fillPageValues() {
    speedForm.querySelectorAll("input").forEach((input, i) => {
        input.value = options.speedPresets[i + 1];
    });
    skipForm.skipSeconds.value = options.skipPresets.seconds;
}

// Initialize with the user's option settings
chrome.storage.local.get('options', ({ options: opts }) => {

    if(opts == null) return;

    options = opts;
    fillPageValues();
});

resetButton.addEventListener("click", () => {
    options = getDefaults();
    fillPageValues();
    saveOptions();
});

speedForm.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const name = input.name;

        var value = parseFloat(input.value);

        if(value == NaN) return;

        if(value > 16) {
            alert("Values higher than 16 are not permitted");
            value = input.value = 16;
        } else if (value <= 0) {
            alert("Values zero or less are not permitted");
            value = input.value = 1;
        }
        
        options.speedPresets[name.charAt(name.length - 1)] = value;
        saveOptions();
    });
});

skipForm.skipSeconds.addEventListener("input", () => {
    const seconds = parseFloat(skipForm.skipSeconds.value),
          enabled = options.skipPresets.enabled;

    if(!enabled || seconds == NaN) return;

    options.skipPresets.seconds = seconds;

    saveOptions();
});