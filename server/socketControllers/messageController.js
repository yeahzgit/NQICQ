const Message = require('../models').Message;

const messageController = {}

messageController.addMessage = (data) => {
	return new Promise((resolve) => {
		const message = Object.assign(new Message(), data);
		Message.addMessage(message).then(message => {
			Message.getMessageById(message._id).then(message => {
				resolve(message);
			})
		})
	})
}

module.exports = messageController;