interface Props {
  userId: string
}

export default function Header({ userId }: Props) {
  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId) // copy to clipboard
  }

  return (
    <header>
      <h1 className='text-sm'>Secret Chat</h1>

      <p className='text-sm text-gray-500 flex flex-col'>
        Your user ID is:{' '}
        <button
          onClick={handleCopyUserId}
          className='bg-transparent px-0 w-max'
        >
          <code className='text-green-500'>{userId}</code>
        </button>
      </p>
    </header>
  )
}
