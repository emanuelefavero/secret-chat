import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import Header from '@/components/Header'
import Message from '@/components/Message'
import MessageInput from '@/components/MessageInput'
import { IMessage } from '@/types.ts'
import { encryptData, decryptData } from '@/utils/crypto.ts'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'
const socket = io(serverUrl)

function App() {
  const [cryptoKey, setCryptoKey] = useState<string>('')
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [messageText, setMessageText] = useState('')

  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate a random user ID and save it in session storage
    let id = sessionStorage.getItem('userId')
    if (!id) {
      id = uuidv4()
      sessionStorage.setItem('userId', id)
    }
    setUserId(id)

    // Generate a random key for encryption
    async function generateKey() {
      const key = await crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true, // extractable
        ['encrypt', 'decrypt'] // key usages
      )

      // Export the key as a base64 string
      const exportedKey = await crypto.subtle.exportKey('raw', key)
      const exportedAsBase64String = btoa(
        String.fromCharCode(...new Uint8Array(exportedKey))
      )
      setCryptoKey(exportedAsBase64String) // Save the key in state
    }

    generateKey()

    // Load and decrypt messages from session storage
    const storedMessages = sessionStorage.getItem('messages')
    if (storedMessages) {
      decryptData(storedMessages, cryptoKey.toString())
        .then((decryptedMessages: string) => {
          try {
            const messages = JSON.parse(decryptedMessages)
            setMessages(messages)
          } catch (e) {
            console.error('Failed to parse messages:', e)
          }
        })
        .catch((error: Error) => {
          console.error('Decryption failed:', error)
        })
    }

    // Add a listener to receive messages
    const messageListener = (message: IMessage) => {
      // Save the new message in state and session storage
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message]
        // Encrypt and save to session storage
        encryptData(JSON.stringify(updatedMessages), cryptoKey.toString())
          .then((encryptedMessages: string) => {
            sessionStorage.setItem('messages', encryptedMessages)
          })
          .catch((error: Error) => {
            console.error('Encryption failed:', error)
          })
        return updatedMessages
      })
    }

    // Listen for messages
    socket.on('message', messageListener)

    // Cleanup function to remove the event listener
    return () => {
      socket.off('message', messageListener)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = () => {
    if (messageText.trim()) {
      const message = { userId, text: messageText }
      socket.emit('sendMessage', message)
      setMessageText('')
    }
  }

  return (
    <>
      <Header userId={userId} />

      <div className='flex justify-center px-4'>
        <main className='w-full max-w-screen-lg'>
          <div className='pb-20 pt-28'>
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                isCurrentUser={message.userId === userId}
                ref={index === messages.length - 1 ? lastMessageRef : undefined}
              />
            ))}
          </div>

          <footer>
            <MessageInput
              messageText={messageText}
              setMessageText={setMessageText}
              sendMessage={sendMessage}
            />
          </footer>
        </main>
      </div>
    </>
  )
}

export default App
