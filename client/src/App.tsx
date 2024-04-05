import { ChatProvider } from '@/context/ChatContext'
import Chat from '@/components/Chat'
import Header from '@/components/Header'

function App() {
  return (
    <>
      <ChatProvider>
        <Header />
        <Chat />
      </ChatProvider>
    </>
  )
}

export default App
