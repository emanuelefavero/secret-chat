import './App.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'
const socket = io(serverUrl)

// --- Message Component ---
interface MessageProps {
  username: string
  text: string
}

function Message({ username, text }: MessageProps) {
  return (
    <>
      <p>{username}</p>
      <p>{text}</p>
    </>
  )
}
// -------------------------

function App() {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = () => {
    socket.emit('sendMessage', { text: messageText })
    setMessageText('')
  }

  return (
    <>
      <h1 className='text-purple-500'>Secret Chat</h1>

      <div>
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
          />
        ))}
      </div>
      <div>
        <input
          type='text'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder='Type your message...'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
