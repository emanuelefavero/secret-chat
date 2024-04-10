import React, { useEffect, useRef } from 'react'
import sendIcon from '/send-icon.svg'
import { useChat } from '@/context/useChat'

export default function MessageInput() {
  const { messageText, setMessageText, sendMessage } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto' // Reset height to recalculate
      const maxHeight =
        parseInt(window.getComputedStyle(textareaRef.current).lineHeight, 10) *
        10 // Calculate max height for 10 lines
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`
    }
  }, [messageText]) // Re-calculate height whenever messageText changes

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter was pressed without shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Prevent new line
      sendMessage()
    }
  }

  return (
    <div className='fixed inset-x-0 bottom-0 flex justify-center p-4 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-800'>
      <div className='w-full flex items-end max-w-screen-lg'>
        <textarea
          ref={textareaRef}
          className='w-full mr-2 text-inherit bg-inherit rounded-3xl pt-2 pb-3 pl-5 pr-4 focus:outline-none border border-gray-300 dark:border-gray-800 resize-none overflow-auto'
          rows={1}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type your message...'
        />
        <button
          onClick={sendMessage}
          className={`${
            messageText.trim()
              ? 'opacity-100'
              : 'opacity-75 bg-gray-300 dark:bg-black border-gray-300 dark:border-gray-700 pointer-events-none'
          } rounded-full w-12 h-11 py-1 px-[0.6rem] border border-blue-600 hover:bg-blue-600 active:bg-blue-700 transition-opacity duration-200 ease-in`}
        >
          <img src={sendIcon} alt='Send' />
        </button>
      </div>
    </div>
  )
}
