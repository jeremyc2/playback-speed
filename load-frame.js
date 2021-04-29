appID.then(id => {
    if(appID == id) {
        controllerFrame.src = 'https://glacial-peak-93348.herokuapp.com/controller.html';
    } else {
        controllerFrame.src = `https://glacial-peak-93348.herokuapp.com/controller.html?id=${id}`;
    }
})