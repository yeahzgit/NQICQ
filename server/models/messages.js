const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
	user: { type: ObjectId, ref: 'User' },
	send_date: { type: Date, default: Date.now },
	content: String
})

messageSchema.statics = {
	addMessage(message) {
		return message.save();
	},
	getMessageById(messageId) {
		return this.findById(messageId).populate('user', {}).exec();
	}
}

module.exports = messageSchema;