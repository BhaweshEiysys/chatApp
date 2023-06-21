import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = ({ user }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch all chats from the server
    fetchChats();

    // Listen for new chat messages from the server
    socket.on('newChat', newChat => {
      setChats(prevChats => [...prevChats, newChat]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);
  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats');
      const chats = await response.json();
      setChats(chats);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };
 
const handleChatSubmit = e => {
  e.preventDefault();
  const message = e.target.message.value;
  const newChat = { message, sender: user.name };

  // Emit the new chat message to the server
  socket.emit('newChat', newChat);

  setChats(prevChats => [...prevChats, newChat]);

  e.target.reset();
};

return (
  <div>
    <h2>Welcome to the Chat Room, {user.name}!</h2>
    <h3>Status: {user.status}</h3>

    <div className="chat-container">
      <h3>Chats:</h3>
      <ul>
        {chats.map((chat, index) => (
          <li key={index}>
            <strong>{chat.sender}:</strong> {chat.message}
          </li>
        ))}
      </ul>
    </div>

    <div className="chat-input">
      <form onSubmit={handleChatSubmit}>
        <input type="text" name="message" placeholder="Type your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
);
};

export default ChatRoom;

