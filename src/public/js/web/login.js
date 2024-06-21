document.getElementById('toggle-password-visibility').addEventListener('click', function() {
    var passwordInput = document.getElementById('password-input');
    var passwordIcon = document.getElementById('password-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fi-sr-eye');
        passwordIcon.classList.add('fi-rs-crossed-eye');
    } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fi-rs-crossed-eye');
        passwordIcon.classList.add('fi-sr-eye');
    }
});