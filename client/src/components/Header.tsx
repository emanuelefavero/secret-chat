import { useState } from 'react'
import './Header.css'

interface Props {
  userId: string
}

export default function Header({ userId }: Props) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId) // copy to clipboard
    setIsCopied(true) // show copied message
    setTimeout(() => setIsCopied(false), 1500) // reset after 1.5 seconds
  }

  return (
    <header>
      <h1 className='text-sm'>Secret Chat</h1>

      <p className='text-sm text-gray-500 flex flex-col max-w-fit'>
        Your user ID is:{' '}
        <div className='relative flex flex-col items-center'>
          <button
            onClick={handleCopyUserId}
            className='bg-transparent px-0 w-max'
          >
            <code className='text-green-500'>{userId}</code>
          </button>

          {isCopied && (
            <span className='user-id-copied-tooltip absolute -bottom-8 mb-2 w-fit text-xs text-black dark:text-white bg-gray-300 dark:bg-gray-900 px-2 py-1 rounded-md'>
              Copied!
            </span>
          )}
        </div>
      </p>
    </header>
  )
}
