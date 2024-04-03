import { forwardRef } from 'react'

interface Props {
  text: string
  isCurrentUser: boolean
  ref?: React.RefObject<HTMLDivElement>
}

type Ref = HTMLDivElement

// TIP: forwardRef is used to pass the ref prop between components

const Message = forwardRef<Ref, Props>(
  ({ text, isCurrentUser }: Props, ref) => {
    const currentUserMessageStyle = isCurrentUser
      ? 'text-white bg-blue-500'
      : 'text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-900'
    const justifyRightIfCurrentUser = isCurrentUser
      ? 'justify-end'
      : 'justify-start'

    return (
      <div className={`flex ${justifyRightIfCurrentUser}`}>
        <div
          ref={ref}
          className={`${currentUserMessageStyle} mb-2 px-3 py-1 rounded-2xl w-fit max-w-xs`}
        >
          <p>{text}</p>
        </div>
      </div>
    )
  }
)

export default Message
