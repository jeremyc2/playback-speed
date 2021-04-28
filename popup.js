var qrcode;
document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({type: "get-id"}, response => {
        var url = `https://glacial-peak-93348.herokuapp.com/?id=${response}`;
        qrcode = new QRCode("qrcode", url);
        remoteLink.href = url;
        remoteLink.innerText = "Remote Control";
    });
});