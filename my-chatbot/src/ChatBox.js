import React from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div style={{ color: 'white', backgroundColor: 'black' }}>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default ChatBox;
