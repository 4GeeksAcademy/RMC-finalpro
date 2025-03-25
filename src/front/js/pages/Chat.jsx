import React, { useState, useEffect } from "react";
import "./../../styles/Chat.css";
import io from "socket.io-client";

const socket = io(process.env.BACKEND_URL);

const Chat = ({ userEmail }) => {
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState({});
  const [message, setMessage] = useState(""); 
  const [targetUser, setTargetUser] = useState(""); 
  const [newUserEmail, setNewUserEmail] = useState("");
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (userEmail) {
      socket.emit("register_user", userEmail);
    }

    socket.on("update_users", (connectedUsers) => {
      setUsers(connectedUsers);
    });

    socket.on("receive_message", (msg) => {
      setConversations(prev => ({
        ...prev,
        [msg.sender]: [...(prev[msg.sender] || []), {
          ...msg,
          position: messageCount % 2 === 0 ? 'right' : 'left'
        }]
      }));
      setMessageCount(prev => prev + 1);
    });

    return () => {
      socket.off("update_users");
      socket.off("receive_message");
    };
  }, [userEmail, messageCount]);

  const addUser = () => {
    if (newUserEmail.trim() && !users.includes(newUserEmail)) {
      setUsers(prev => [...prev, newUserEmail]);
      setNewUserEmail("");
    }
  };

  const removeUser = (email, e) => {
    e.stopPropagation();
    setUsers(users.filter(user => user !== email));
    if (targetUser === email) {
      setTargetUser("");
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !targetUser.trim()) return;

    const newMessage = {
      text: message,
      target: targetUser,
      sender: userEmail,
      timestamp: new Date().toISOString(),
      position: messageCount % 2 === 0 ? 'right' : 'left'
    };

    socket.emit("send_message", newMessage);
    
    setConversations(prev => ({
      ...prev,
      [targetUser]: [...(prev[targetUser] || []), newMessage]
    }));
    
    setMessage("");
    setMessageCount(prev => prev + 1);
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <h3 className="chat-heading" style={{ color: '#8A2BE2' }}>Mensajería</h3>
        
        <div className="sidebar">
          <div className="sidebar-top">
            <h3 style={{ color: '#8A2BE2', marginBottom: '10px' }}>Usuarios</h3>
            <div className="user-list">
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`user ${user === targetUser ? "selected-user" : ""}`}
                  onClick={() => setTargetUser(user)} 
                >
                  <span>{user} {user === userEmail ? "(Tú)" : ""}</span>
                  {user !== userEmail && (
                    <button  
                      className="remove-user-btn" 
                      onClick={(e) => removeUser(user, e)}
                    >
                      ×    
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar-bottom">
            <div className="add-user">
              <input
                type="text"
                placeholder="Agregar usuario..."
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addUser()}
              />
              <button onClick={addUser}>+</button>
            </div>
          </div>
        </div>

        <div className="chat-area">
          <div className="chat-header">
            {targetUser ? `Chat con ${targetUser}` : "Selecciona un usuario"}
          </div>
          
          <div className="messages">
            {(conversations[targetUser] || []).map((msg, index) => (
              <div
                key={`${msg.timestamp || index}`}
                className={`message ${msg.position}`}
              >
                <div className="messagecontent">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {targetUser && (
            <div className="chat-input">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Enviar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
