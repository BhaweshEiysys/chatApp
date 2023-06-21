const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chatController');

// Get all chats
router.get('/', ChatController.getAllChats);

// Create a new chat message
router.post('/', ChatController.createChat);

module.exports = router;
