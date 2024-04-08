import { useState, useEffect, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IMessage } from '@/types.ts'
import { encryptData, decryptData } from '@/utils/crypto.ts'
import { socket } from '@/utils/socket.ts'

interface IChatContext {
  userId: string
  messages: IMessage[]
  messageText: string
  setMessageText: (text: string) => void
  sendMessage: () => void
  handleClearChat: () => void
  showClearChatAnimation: boolean
}

export const ChatContext = createContext<IChatContext>({
  userId: '',
  messages: [],
  messageText: '',
  setMessageText: () => {},
  sendMessage: () => {},
  handleClearChat: () => {},
  showClearChatAnimation: false,
})

// * ChatProvider
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [cryptoKey, setCryptoKey] = useState<string>('')
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [messageText, setMessageText] = useState('')
  const [showClearChatAnimation, setShowClearChatAnimation] = useState(false)

  const sendMessage = () => {
    if (messageText.trim()) {
      const message = { userId, text: messageText }
      socket.emit('sendMessage', message)
      setMessageText('')
    }
  }

  // Clear chat from client and session storage
  const handleClearChat = () => {
    // Show the clear chat animation
    setShowClearChatAnimation(true)
    setTimeout(() => {
      setMessages([])
      sessionStorage.removeItem('messages')
      setShowClearChatAnimation(false)
    }, 1100)
  }

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

  return (
    <ChatContext.Provider
      value={{
        userId,
        messages,
        messageText,
        setMessageText,
        sendMessage,
        handleClearChat,
        showClearChatAnimation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
