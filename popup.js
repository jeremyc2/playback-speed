var qrcode;
document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({type: "get-id"}, response => {
        console.log(JSON.stringify(response));
        var url;
        response.then(id => {
            url = `https://glacial-peak-93348.herokuapp.com/?id=${id}`;
        }).catch(ex => {
            console.error(ex);
            url = 'https://glacial-peak-93348.herokuapp.com';
        });

        qrcode = new QRCode("qrcode", url);
    });
});