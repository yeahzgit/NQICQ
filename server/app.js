const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');
const configs = require('./configs');

const bodyParser = require('body-parser');
const httpControllers = require('./httpControllers');
const socketControllers = require('./socketControllers');
const middlewares = require('./middlewares');

const userController = socketControllers.userController;
const messageController = socketControllers.messageController;


io.use(socketioJwt.authorize({
  secret: 'jwtSecret',
  handshake: true
}));


io.on('connection', (socket) => {

	//用户进入聊天室
	socket.on('user login', (data) => {
		userController.changeOnline(data).then(user => {
			io.emit('user login', user)
		})
	})

	//获取用户列表
	socket.on('get user list', () => {
		userController.getAllUsers().then(users => {
			socket.emit('get user list', users)
		})
	})
	
	//发送新消息
	socket.on('new message', (data) => {
		messageController.addMessage(data).then(message => {
			if(message.content.search(/\[system\]/) !== -1) {
				io.emit('system message', message.content.replace(/\[system\]/, ''));
			}
			else {
				io.emit('new message', message);
			}
		})
	})

	//用户离开聊天室
	socket.on('disconnect', () => {
		let data = {_id: socket.decoded_token._id };
		userController.changeOffline(data).then(user => {
			io.emit('user logout', user)
		})
	})
});

app.use(middlewares.response);
app.use(bodyParser.json());
app.use(httpControllers);


server.listen(configs.port, () => {
	console.log('server started on localhost ' + configs.port);
});