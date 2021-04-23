const immutableDefaults = Object.freeze({
    speedPresets: Object.freeze(
        {1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3, 6: 4, 7: 5, 8: 7, 9: 9}
    ),
    skipPresets: Object.freeze(
        {enabled: false, seconds: 30}
    )
});

function getDefaults() {
    return JSON.parse(JSON.stringify(immutableDefaults));
}