interface Props {
  userId: string
}

export default function Header({ userId }: Props) {
  return (
    <header>
      <h1 className='text-sm'>Secret Chat</h1>

      <p className='text-sm text-gray-500 flex flex-col'>
        Your user ID is: <code className='text-green-500'>{userId}</code>
      </p>
    </header>
  )
}
