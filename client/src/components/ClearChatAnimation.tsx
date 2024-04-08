import Lottie from 'react-lottie'
import animationData from '@/lotties/clear-chat.json'

export default function ClearChatAnimation() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className='fixed z-50 w-full h-full flex justify-center items-center'>
      {/* Lottie animation */}
      <Lottie options={defaultOptions} height='100%' width='100%' />
      {/* Overlay text */}
      <h2 className='absolute text-center text-2xl'>Chat Cleared</h2>
    </div>
  )
}
