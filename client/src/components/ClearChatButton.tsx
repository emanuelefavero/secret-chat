import { useChat } from '@/context/useChat'

export default function ClearChatButton() {
  const { handleClearChat } = useChat()

  return (
    <button
      onClick={handleClearChat}
      className='w-full text-sm rounded-none bg-rose-500 bg-opacity-20 text-rose-500 p-1 border-b border-rose-300 border-opacity-50 hover:bg-opacity-25 active:bg-opacity-30 transition-all duration-150 ease-in'
    >
      Clear Chat
    </button>
  )
}
