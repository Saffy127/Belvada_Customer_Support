import React, { useState } from 'react';
import axios from 'axios';

const InputBox = ({ onNewMessage }) => {
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/chat', { message: input });
      onNewMessage(response.data.message);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputBox;
