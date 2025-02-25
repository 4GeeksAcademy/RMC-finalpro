import React, { useState } from 'react';


function Message({ text, sender }) {
  return (
    <div className={`message ${sender === 'Alice' ? 'text-left' : 'text-right'} mb-2`}>
      <strong>{sender}: </strong>{text}
    </div>
  );
}

function ChatONG({ messages, onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="container col-4 mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          Chat
        </div>
        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <Message key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSend}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatONG;