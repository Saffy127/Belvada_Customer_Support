import React, { useState } from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import icon from './Belvada_Icon.png';

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="App">
      <ChatBox messages={messages} />
      <InputBox onNewMessage={handleNewMessage} />
    </div>
  );
  
  function Header() {
    return (
      <div>
        <img scr={icon} alt="Chatbot Icon" />

      </div>
    );
  }
}

export default App;
