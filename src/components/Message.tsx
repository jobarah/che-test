import React, { useEffect, useState } from 'react'
import './Message.css'
import { marked } from 'marked'

interface MessageProps {
  message: string;
  sender: string;
}

function Message(props: MessageProps) {
  const [parsedMessage, setParsedMessage] = useState('');

  useEffect(() => {
    async function parseMessage() {
      const res = await marked.parse(props.message)

      console.log(res);

      setParsedMessage(res);
    }

    parseMessage();
  }, [props.message])

  return (
    <div className="bubble">
      <p className={`message ${props.sender === 'client' ? 'left' : 'right' }`} dangerouslySetInnerHTML={{__html: parsedMessage}}>
      </p>
    </div>
  );
}

export default Message;