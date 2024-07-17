//disable keybinds
document.addEventListener('keydown', function(event) {
    if (event.key === 'PrintScreen') {
        event.preventDefault();
        alert('Screenshot disabled.');
    }
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        alert('Screenshot disabled..');
    }
    if (event.ctrlKey && event.key === 'Shift' && event.key === 's') {
        event.preventDefault();
        alert('Screenshot disabled.');
    }
});


//this is for that the user not can do right click and can read the code or save image 
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('Function disabled.');
});


//Disable capture keys on mobile devices
window.onload = function() {
    window.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            alert('Screenshot disabled.');
        }
    });
}