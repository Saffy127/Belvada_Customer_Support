import React, { useState } from 'react';
import Chat from './Chat';
import ChatInput from './ChatInput';
import axios from 'axios';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userMessage) => {
    // Update messages with user's message
    setMessages(prevMessages => [...prevMessages, { text: userMessage, isBot: false }]);
  
    try {
      // Call backend to get bot's response 
      const response = await axios.post('http://localhost:5000/chat', {
        messages: [
          { role: "user", content: userMessage }  // Assuming the Flask backend structures this correctly
        ]
      });
      const botMessage = response.data.message;
  
      // Update messages with bot's message 
      setMessages(prevMessages => [...prevMessages, { text: botMessage, isBot: true }]);
    } catch (error) {
      console.error("Error in sending message:", error);
      // Handle the error appropriately in the UI
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <img src="/Belvada_Icon.png"alt="Belvada Icon" className="chat-icon" />
        <h1>Belvada Chatbot</h1>
      </header>
      <Chat messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}

export default App;