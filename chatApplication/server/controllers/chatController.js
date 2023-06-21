const Chat = require('../models/chat');

// Get all chats
exports.getAllChats = (req, res) => {
  Chat.find()
    .then(chats => {
      res.json(chats);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to get chats' });
    });
};

// Create a new chat message
exports.createChat = (req, res) => {
  const { message, sender } = req.body;

  const newChat = new Chat({
    message,
    sender
  });

  newChat.save()
    .then(chat => {
      res.status(201).json(chat);
      // Emit the new chat message to all connected clients
      io.emit('newChat', chat);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to create a new chat' });
    });
};
