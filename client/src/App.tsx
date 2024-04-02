import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import Message from './components/Message'
import MessageInput from './components/MessageInput'
import { IMessage } from './types.ts'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'
const socket = io(serverUrl)

function App() {
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
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
    const messageListener = (message: IMessage) => {
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
      <header>
        <h1>Secret Chat</h1>
      </header>

      <div className='flex justify-center'>
        <main className='w-full max-w-screen-lg'>
          <div className='py-2 pb-16 pt-4'>
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                isCurrentUser={message.userId === userId}
              />
            ))}
          </div>

          <MessageInput
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
          />
        </main>
      </div>
    </>
  )
}

export default App
