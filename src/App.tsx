import React, { useState } from 'react'
import './App.css'
import Message from './components/Message'
import chat from './chat'
import {
  AiOutlineMessage,
  AiOutlineArrowsAlt,
  AiOutlineShrink,
  AiOutlineClose
} from 'react-icons/ai'
import reactLogo from './assets/react.svg'
import viteLogo from './public/vite.svg'

function App() {

  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="gemini-bot">
      {!isMinimized && !isActive && 
      <>
        <div className="chat-with-us" onClick={() => setIsActive(!isActive)}>
          <AiOutlineMessage className="chat-icon"/>
        </div>
      </>
      }
      {isActive && !isMinimized &&
        <>
          <div className="chat-bot">
            <header className="header">
              <div className="top-row">
                <div className="action-btns">
                  <AiOutlineShrink  className="min-btn" onClick={() => setIsMinimized(!isMinimized)}/>
                  <AiOutlineClose className="close-btn" onClick={() => setIsActive(!isActive)}/>
                </div>
              </div>
              <h3>Hi there! How can we help you?</h3>
              <div className="rep-info">
                <div className="rep-details-container">
                  <div className="rep-details">Che</div>
                  <div className="rep-details">Virtual Assistant</div>
                </div>
              </div>
            </header>
              <div className="chat">
                {
                  chat.map(({ message, sender }) => {
                    return (
                      <Message
                        message={message}
                        sender={sender}
                        key={message}
                      />
                    );
                  })
                }
              </div>
              <footer>
                <div className="input-container">
                  <input className="input field" type="text" placeholder="Send a message..." />
                </div>
              </footer>
          </div>
        </>
      }
      {
        isActive && isMinimized &&
        <div className="minimized-header chat-bot" onClick={() => setIsMinimized(!isMinimized)}>
          <img src={viteLogo} className="min-header-company-hero" alt="company photo" />
          <div>Che Web Assistance</div>
          <AiOutlineArrowsAlt className="max-btn"/>
        </div>
      }
    </div>
  )
}

export default App
