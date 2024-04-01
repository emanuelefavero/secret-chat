import './App.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'
const socket = io(serverUrl)

// --- Message Component ---
interface MessageProps {
  text: string
  isCurrentUser: boolean
}

function Message({ text, isCurrentUser }: MessageProps) {
  const currentUserMessageStyle = isCurrentUser ? 'bg-blue-500' : ''

  return (
    <div className={`${currentUserMessageStyle}`}>
      <p>{text}</p>
    </div>
  )
}
// -------------------------

interface Message {
  userId: string
  text: string
}

function App() {
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    // Generate a random user ID and save it in session storage
    let id = sessionStorage.getItem('userId')
    if (!id) {
      id = uuidv4()
      sessionStorage.setItem('userId', id)
    }
    setUserId(id)

    // Add a listener to receive messages
    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    }

    // Listen for messages
    socket.on('message', messageListener)

    // Cleanup function to remove the event listener
    return () => {
      socket.off('message', messageListener)
    }
  }, [])

  const sendMessage = () => {
    if (messageText.trim()) {
      const message = { userId, text: messageText }
      socket.emit('sendMessage', message)
      setMessageText('')
    }
  }

  return (
    <>
      <h1 className='text-purple-500'>Secret Chat</h1>

      <div>
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isCurrentUser={message.userId === userId}
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
