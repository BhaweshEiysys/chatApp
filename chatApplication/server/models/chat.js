const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message: String,
  sender: String
});

module.exports = mongoose.model('Chat', chatSchema);
