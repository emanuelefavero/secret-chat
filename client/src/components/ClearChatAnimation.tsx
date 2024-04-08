import Lottie from 'react-lottie'
import animationData from '@/lotties/clear-chat.json'
import { useChat } from '@/context/useChat'

export default function ClearChatAnimation() {
  const { showClearChatAnimation } = useChat()

  if (!showClearChatAnimation) return null

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className='fixed z-10 w-full h-full flex justify-center items-center'>
      {/* Lottie animation */}
      <Lottie
        options={defaultOptions}
        height='100%'
        width='100%'
        isClickToPauseDisabled
      />
    </div>
  )
}
