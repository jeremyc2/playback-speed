getID().then(id => {
    controllerFrame.src = `https://glacial-peak-93348.herokuapp.com/controller.html?id=${id}`;
}).catch(ex => {
    console.error(ex);
    controllerFrame.src = 'https://glacial-peak-93348.herokuapp.com/controller.html';
});