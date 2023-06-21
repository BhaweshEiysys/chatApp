import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserForm from './components/UserForm';
import ChatRoom from './components/ChatRoom';

const socket = io('http://localhost:3000');

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for status updates from the server
    socket.on('statusUpdated', updatedStatus => {
      if (user && user.name !== updatedStatus.name) {
        setUser(prevUser => {
          if (prevUser.name === updatedStatus.name) {
            return { ...prevUser, status: updatedStatus.status };
          }
          return prevUser;
        });
      }
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [user]);

  const handleUserSubmit = userData => {
    // Emit the user's status to the server
    socket.emit('updateStatus', userData);
    setUser(userData);
  };

  return (
    <div className="App">
      {user ? (
        <ChatRoom user={user} />
      ) : (
        <UserForm onUserSubmit={handleUserSubmit} />
      )}
    </div>
  );
};

export default App;
