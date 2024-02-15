import React from 'react'
import './Message.css'

interface MessageProps {
  message: string;
  sender: string;
}

function Message(props: MessageProps) {
  return (
    <div className="bubble">
      <p className={`message ${props.sender === 'client' ? 'left' : 'right' }`}>
        {props.message}
      </p>
    </div>
  );
}

export default Message;