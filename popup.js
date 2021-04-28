var qrcode;
chrome.runtime.sendMessage({type: "get-id"}, response => {
    qrcode = new QRCode("qrcode", `https://glacial-peak-93348.herokuapp.com/?id=${response}`);
});