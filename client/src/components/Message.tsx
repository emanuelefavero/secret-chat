interface Props {
  text: string
  isCurrentUser: boolean
}

export default function Message({ text, isCurrentUser }: Props) {
  const currentUserMessageStyle = isCurrentUser
    ? 'text-white bg-blue-500'
    : 'text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-900'
  const justifyRightIfCurrentUser = isCurrentUser
    ? 'justify-end'
    : 'justify-start'

  return (
    <div className={`flex ${justifyRightIfCurrentUser}`}>
      <div
        className={`${currentUserMessageStyle} mb-2 px-3 py-1 rounded-2xl w-fit max-w-xs`}
      >
        <p>{text}</p>
      </div>
    </div>
  )
}
