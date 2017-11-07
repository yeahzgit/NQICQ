const router = require('express').Router();
const messageController = require('./messageController');
const userController = require('./userController');

router.route('/register')
	.post(userController.addUser)

router.route('/users')
	.get(userController.getAllUsers)

router.route('/auth')
	.post(userController.auth)

module.exports = router; 