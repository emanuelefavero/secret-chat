import { useEffect, useRef } from 'react'
import { useChat } from '@/context/useChat'
import Message from '@/components/Message'

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
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isCurrentUser={message.userId === userId}
          ref={index === messages.length - 1 ? lastMessageRef : undefined}
        />
      ))}
    </>
  )
}

export default Chat
