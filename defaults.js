const immutableDefaults = Object.freeze({
    speedPresets: Object.freeze(
        {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}
    ),
    skipPresets: Object.freeze(
        {enabled: true, seconds: 5}
    )
});

function getDefaults() {
    return JSON.parse(JSON.stringify(immutableDefaults));
}