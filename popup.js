var qrcode;
document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({type: "get-id"}, response => {
        const url = `https://glacial-peak-93348.herokuapp.com/?id=${response}`;
        qrcode = new QRCode("qrcode", url);
    });
});