const immutableDefaults = Object.freeze({
    speedPresets: Object.freeze(
        {1: 1, 2: 1.25, 3: 1.5, 4: 1.75, 5: 2, 6: 2.5, 7: 3, 8: 4, 9: 10}
    ),
    skipPresets: Object.freeze(
        {enabled: false, seconds: 15}
    )
});

function getDefaults() {
    return JSON.parse(JSON.stringify(immutableDefaults));
}