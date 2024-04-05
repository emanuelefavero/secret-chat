import { useEffect, useRef } from 'react'
import { useChat } from '@/context/useChat'
import Header from '@/components/Header'
import Message from '@/components/Message'
import MessageInput from '@/components/MessageInput'
import { socket } from '@/utils/socket.ts'

function Chat() {
  const { userId, messages, messageText, setMessageText } = useChat()
  const lastMessageRef = useRef<HTMLDivElement>(null)

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
      <Header />

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
            <MessageInput sendMessage={sendMessage} />
          </footer>
        </main>
      </div>
    </>
  )
}

export default Chat
