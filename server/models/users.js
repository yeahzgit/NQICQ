const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: { type: String, select: false },
	user_pic: { type: String, default: 'https://images.nowcoder.com/images/20170303/9721619_1488473050811_7C2C60506876716CCF0E706DB13D4511@0e_100w_100h_0c_1i_1o_90Q_1x' },
	email: String,
	bubble_style: { type: Number, default: 1 },
	on_line: { type: Boolean, default: false } 
})

userSchema.statics = {
	addUser(user) {
		return user.save();
	},
	getAllUsers() {
		return this.find();
	},
	findUserByEmail(email) {
		return this.findOne({ email: email });
	},
	auth(email, password) {
		return this.findOne({ email, password });
	},
	updateUser(user) {
		return user.save();
	},
	getUserById(userId) {
		return this.findById(userId);
	}
}

module.exports = userSchema;