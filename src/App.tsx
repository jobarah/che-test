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
import viteLogo from './public/vite.svg'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useEffect } from "react";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBIYhVsrLK-r_A_rDg6sX80JfL0WyvXOkc');

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


function App() {

  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messesagesRef = useRef(null);

  const getRespose = async (query: string) => {
    setLoading(true);
    const result = await model.generateContent(query);
    const response = await result.response;
    setLoading(false);
    const text = response.text();
    setMessages((prevArray) => [...prevArray, { message: query, sender: 'client' }]);
    setMessages((prevArray) => [...prevArray, { message: text, sender: 'bot' }]);
  }

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
                  messages.map(({ message, sender }) => {
                    return (
                      <Message
                        message={message}
                        sender={sender}
                        key={message}
                      />
                    );
                  })
                }
                {loading &&
                  <div className="loader">
                    <div className="typing">
                      <span className="circle scaling"></span>
                      <span className="circle scaling"></span>
                      <span className="circle scaling"></span>
                    </div>
                  </div>}
              </div>
              <footer>
                <div className="input-container">
                  <input className="input field" type="text" placeholder="Send a message..." onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      getRespose(event.currentTarget.value);
                      event.currentTarget.value = '';
                    }
                  }}/>
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
