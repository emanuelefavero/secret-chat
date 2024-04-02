import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import sendIcon from '/send-icon.svg'
import Message from './components/Message'
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
          <div className='fixed inset-x-0 bottom-0 flex p-4 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-800'>
            <input
              className='w-full mr-2 text-inherit bg-inherit rounded-full px-4 focus:outline-none border border-gray-300 dark:border-gray-800'
              type='text'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder='Type your message...'
            />
            <button
              onClick={sendMessage}
              className={`${
                messageText.trim()
                  ? 'opacity-100'
                  : 'opacity-75 bg-gray-300 dark:bg-black border-gray-300 dark:border-gray-700 pointer-events-none'
              } rounded-full py-1 px-[0.6rem] border border-blue-600 hover:bg-blue-600 active:bg-blue-700 transition-opacity duration-200 ease-in`}
            >
              <img src={sendIcon} alt='Send' />
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
