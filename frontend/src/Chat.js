import React, { useState, useEffect } from 'react';
import './App.css'
function Chat({ messages }) {
    return (
        <div className="chat-box">
            {messages.map((msg, index) => (
                <div key={index} className={msg.isBot ? 'bot-msg' : 'user-msg'}>
                    {msg.text}
                </div>
            ))}
        </div>
    );
}
export default Chat;