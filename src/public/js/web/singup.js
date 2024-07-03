document.getElementById('formSingUp').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted automatically

    var password = document.getElementById('password').value; //get the password 1
    var confirmPassword = document.getElementById('confirmPassword').value; //get the password 2
    var errorMessage = document.getElementById('error-message');

    //we will see if the password have with 8 character
    if (password.length < 8) {
        errorMessage.textContent = "La contraseña debe tener al menos 8 caracteres.";
    } else if (password !== confirmPassword) { //we will see if the passwords is equals
        errorMessage.textContent = "Las contraseñas no coinciden.";
    } else {
        errorMessage.textContent = "";
        // if the passwordrs is equals, send the form
        this.submit();
    }
});