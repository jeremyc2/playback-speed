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

    skipForm.enableSkip.checked = options.skipPresets.enabled;
    skipForm.skipSeconds.disabled = !options.skipPresets.enabled;
}

// Initialize with the user's option settings
chrome.storage.local.get('options', res => {

    if(res.options == null) {
        fillPageValues();
        return;
    }

    options = res.options;
    fillPageValues();
});

resetButton.addEventListener("click", () => {
    options = getDefaults();
    fillPageValues();
    saveOptions();
});

speedForm.querySelectorAll("input").forEach((input, i) => {
    input.addEventListener("input", () => {
        var value = parseFloat(input.value);

        if(value == NaN) return;

        if(value > 16) {
            alert("Values higher than 16 are not permitted");
            value = input.value = 16;
        } else if (value <= 0) {
            alert("Values zero or less are not permitted");
            value = input.value = 1;
        }
        
        options.speedPresets[i + 1] = value;
        saveOptions();
    });
});

skipForm.enableSkip.addEventListener('change', function() {
    options.skipPresets.enabled = this.checked;
    skipForm.skipSeconds.disabled = !this.checked;
    saveOptions();
});

skipForm.skipSeconds.addEventListener("input", () => {
    const seconds = parseFloat(skipForm.skipSeconds.value),
          enabled = options.skipPresets.enabled;

    if(!enabled || seconds == NaN) return;

    options.skipPresets.seconds = seconds;

    saveOptions();
});

// TODO Make and sync appID between load-frame.js in background.html
const qrcode = new QRCode("qrcode", `https://glacial-peak-93348.herokuapp.com/?id=${appID}`);