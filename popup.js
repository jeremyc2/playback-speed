var qrcode;
document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({type: "get-id"}, id => {
        var url;
        if(id == null) {
            url = 'https://glacial-peak-93348.herokuapp.com';
        } else {
            url = `https://glacial-peak-93348.herokuapp.com/?id=${id}`;
        }

        qrcode = new QRCode("qrcode", url);
    });
});