import React, { useState } from 'react';

const UserForm = ({ onUserSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = e => {
    e.preventDefault();
    const userData = { name, age, status };
    onUserSubmit(userData);
  };

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
};

export default UserForm;
