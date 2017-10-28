var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(){
	console.log('connection')
});

server.listen(3000, function() {
	console.log('server started on localhost 3000');
});