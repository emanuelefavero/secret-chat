import sendIcon from '/send-icon.svg'

interface Props {
  messageText: string
  setMessageText: (text: string) => void
  sendMessage: () => void
}

export default function MessageInput({
  messageText,
  setMessageText,
  sendMessage,
}: Props) {
  return (
    <div className='fixed inset-x-0 bottom-0 flex justify-center p-4 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-800'>
      <div className='w-full flex max-w-screen-lg'>
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
    </div>
  )
}
