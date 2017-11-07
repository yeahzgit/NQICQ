var header = document.getElementById('form-header');
var loginForm = document.getElementsByClassName('login-form')[0];
var registerForm = document.getElementsByClassName('register-form')[0];
var loginText = document.getElementsByClassName('login-text')[0];

var config = {
	BASE_URL: 'http://localhost/qicq'
}

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

//用户登录
$('.login-submit').click(function() {
	var loginEmail = $('.login-email');
	var loginPassword = $('.login-password');
	if(!loginEmail.val()) {
		loginEmail.next('p').text('请填写邮箱地址')
		return;
	}
	if(!loginPassword.val()) {
		loginPassword.next('p').text('请填写密码')
		return;
	}
	$.ajax({
		url: config.BASE_URL + '/auth',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			email: loginEmail.val(),
			password: loginPassword.val()
		}),
		success: function(data) {
			window.sessionStorage.setItem('userId', data._id);
			window.sessionStorage.setItem('userPic', data.user_pic);
			window.sessionStorage.setItem('token', data.token);
			window.location.href = './index.html';
		},
		error: function(err) {
			alert(err.responseJSON.message)
		} 
	})
})

//用户注册
$('.register-submit').click(function() {
	var registerEmail = $('.register-email');
	var registerUsername = $('.register-username');
	var registerPassword = $('.register-password');
	var registerPasswordConfirm = $('.register-password-confirm');
	console.log(registerEmail.val())
	if(!registerEmail.val()) {
		registerEmail.next('p').text('请填写邮箱地址');
		return;
	}
	if(!registerUsername.val()) {
		registerUsername.next('p').text('请填写用户名');
		return;
	}
	if(!registerPassword.val()) {
		registerPassword.next('p').text('请填写密码');
		return;
	}
	if(!registerPasswordConfirm.val()) {
		registerPasswordConfirm.next('p').text('请再次输入密码');
		return;
	}
	if(registerPassword.val() !== registerPasswordConfirm.val()) {
		registerPasswordConfirm.next('p').text('两次密码输入不一致');
		return;
	}
	$.ajax({
		url: config.BASE_URL + '/register',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			email: registerEmail.val(),
			username: registerUsername.val(),
			password: registerPassword.val()
		}),
		success: function(data) {
			alert('注册成功请登录')
		},	
		error: function(err) {
			alert(err.responseJSON.message)
		}
	})
})