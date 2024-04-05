import { useEffect, useRef } from 'react'
import { useChat } from '@/context/useChat'
import Message from '@/components/Message'
import MessageInput from '@/components/MessageInput'

function Chat() {
  const { userId, messages } = useChat()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Scroll to the last message when a new message is added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
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
            <MessageInput />
          </footer>
        </main>
      </div>
    </>
  )
}

export default Chat
