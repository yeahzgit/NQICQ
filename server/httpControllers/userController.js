const User = require('../models').User;
const jwt = require('jsonwebtoken');

const userController = {}

userController.addUser = (req, res, next) => {
	const body = Object.assign(new User(), req.body);
	User.findUserByEmail(body.email).then(user => {
		if(!user) {
			User.addUser(body).then(user => {
				res.success(user);
			});
		}
		else {
			res.error('该email已经注册', 400);
		}
	}).catch(next)
}

userController.getAllUsers = (req, res, next) => {
	User.getAllUsers().then(users => {
		res.success(users)
	}).catch(next)
}

userController.auth = (req, res, next) => {
	const body = req.body;
	User.auth(body.email, body.password).then(user => {
		if(!user) {
			res.error('用户名或密码不正确', 400)
		}
		else {
			let obj = { 
				_id: user._id,
				emaile: user.email,
				username: user.email,
				user_pic: user.user_pic
			}
			let token = jwt.sign(obj, 'jwtSecret', { expiresIn: '24h' });
			obj.token = token;
			console.log(obj.token)
			res.success(obj)
		}	
	}).catch(next)
}

module.exports = userController;