var socket = io('http://localhost:3333', {
	query: 'token=' + window.sessionStorage.getItem('token')
});

var store = {
	selfId: window.sessionStorage.getItem('userId'),
	userList: []
}

socket.emit('user login', { _id: store.selfId })
socket.emit('get user list');

socket.on('get user list', function(userList) {
	store.userList = userList;
	console.log(userList)
	var str = '';
	userList = userSort(userList);
	changeList(userList);
})


socket.on('user login', function(user) {
	$('.user-pic img').attr('src', user.user_pic);
	$('.user-pic img').attr('title', user.username);  
	$('.chat-list').append(
		'<li class="in-out">' + 
		'<p>' + user.username + '加入聊天室</p>' +
		'</li>'
		)
	resetUsers(user, 1);
	changeList(store.userList);
})

socket.on('new message', function(message) {
	if(message.user._id === store.selfId) {
		$('.chat-list').append(
			'<li class="self">' + 
			'<img class="head-pic" src="' + message.user.user_pic + '">' +
			'<div class="qipao">' + 
			'<div class="corner"></div>' +
			'<p class="chat-text">' + message.content + '</p>' +
			'</div>' +
			'</li>'
			)
	}
	else {
		$('.chat-list').append(
			'<li class="other">' + 
			'<img class="head-pic" src="' + message.user.user_pic +'">' +
			'<span class="user-name">' + message.user.username +'</span>' +
			'<div class="qipao">' +
			'<div class="corner"></div>' +
			'<p class="chat-text">'+ message.content +'</p>' +
			'</div>' +
			'</li>'
			)
	}
	//滚动条滚动到底部
	var h = $('.chat-list').height()-$('.chat-content').height();
  $('.chat-list').scrollTop(9999999999999999999999); 
})

socket.on('system message', function(message) {
	$('.broadcast').append(
		'<p class="system-message">' +
		'<span>系统消息: ' + message + '</span>' +
		'<span class="message-close">×</span>' +
		'</p>'
		)
	setTimeout(function() {
		$('.system-message').remove();
	}, 4000)
	console.log('系统消息: ' + message)
})

socket.on('user logout', function(user) {
	$('.chat-list').append(
		'<li class="in-out">' + 
		'<p>' + user.username + '离开聊天室</p>' +
		'</li>'
		)
	resetUsers(user, 0);
	changeList(store.userList);
})

$('.chat-submit').click(function() {
	var message = {
		user: store.selfId,
		content: ''
	};
	message.content = $('.chat-input').val();
	socket.emit('new message', message);
	$('.chat-input').val('');
})

//用户排序
function userSort(userList) {
	var online = [];
	var offline = [];
	userList.forEach(function(val) {
		if(val.on_line) {
			online.push(val);
		}
		else {
			offline.push(val);
		}
	}) 
	online = online.sort(function(param1, param2) {
		return param1.username.localeCompare(param2.username, 'zh');
	})
	offline = offline.sort(function(param1, param2) {
		return param1.username.localeCompare(param2.username, 'zh');
	})
	return online.concat(offline);
}

//修改用户列表dom
function changeList(userList) {
	$('.user-list').empty();
	var str = '';
	for(var i = 0; i < userList.length; i ++) {
		str += '<li>';
		if(userList[i].on_line) {
			str += '<img class="list-head" src="'; 
		}
		else {
			str += '<img class="list-head off-line" src="'; 
		}
		str += userList[i].user_pic + '">' +
		'<span class="list-name">' + userList[i].username + '</span>' +
		'</li>'
	}
	$('.user-list').append(str);
} 


//重置用户状态
function resetUsers(user, state) {
	var old = false;
	for(var i = 0; i < store.userList.length; i ++) {
		if(store.userList[i]._id === user._id) {
			old = true;
			if(state) {
				store.userList[i].on_line = true;
			}
			else {
				store.userList[i].on_line = false;
			}
			userSort(store.userList);
		}
	}
	if(!old) {
		store.userList.push(user);
		userSort(store.userList);
	}
}