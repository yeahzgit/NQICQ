const mongoose = require('mongoose');
const User = require('./users');
const Message = require('./messages');
const configs = require('../configs');

mongoose.connect(configs.mongodb, configs.mongodbOptions);

exports.User = mongoose.model('User', User);
exports.Message = mongoose.model('Message', Message);