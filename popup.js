var qrcode;
document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({type: "get-id"}, appID => {
        var url;
        if(appID == null) {
            url = 'https://glacial-peak-93348.herokuapp.com';
        } else {
            url = `https://glacial-peak-93348.herokuapp.com/?id=${appID}`;
        }

        qrcode = new QRCode("qrcode", url);
    });
});