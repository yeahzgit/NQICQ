var header = document.getElementById('form-header');
var loginForm = document.getElementsByClassName('login-form')[0];
var registerForm = document.getElementsByClassName('register-form')[0];
var loginText = document.getElementsByClassName('login-text')[0];

function setIndex(className) {
	if(className === 'login-form-header') {
		loginForm.style.zIndex = '1';
		registerForm.style.zIndex = '0';
		loginText.innerText = 'Login';
		document.title = 'NQICQ - Login';
	}
	else {
		loginForm.style.zIndex = '0';
		registerForm.style.zIndex = '1';
		loginText.innerText = 'Register';
		document.title = 'NQICQ - Register';
	}
}

header.addEventListener('click', function(e) {
	var target = e.target;
	if(target.className.search('form-active') === -1) {
		target.className += ' form-active';
	}
	for(var i = 0; i < header.children.length; i ++) {
		if(header.children[i].className !== target.className && header.children[i].className.search('form-active') !== -1) {
			header.children[i].className = header.children[i].className.split(' ')[0];
		}
	}
	setIndex(target.className.split(' ')[0]);
})