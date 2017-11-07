const User = require('../models').User;

const userController = {}

//@param data {_id}
userController.changeOnline = (data) => {
	return new Promise((resolve) => {
		User.getUserById(data._id).then(user => {
			user.on_line = true;
			User.updateUser(user).then(user => {
				resolve(user)
			})
		})
	})
}

userController.changeOffline = (data) => {
	return new Promise((resolve) => {
		User.getUserById(data._id).then(user => {
			user.on_line = false;
			User.updateUser(user).then(user => {
				resolve(user)
			})
		})
	})
}

userController.getAllUsers = () => {
	return new Promise((resolve) => {
		User.getAllUsers().then(users => {
			resolve(users);
		})
	})
}

module.exports = userController;