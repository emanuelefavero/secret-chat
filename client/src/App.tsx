import { ChatProvider } from '@/context/ChatContext'
import Chat from '@/components/Chat'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function App() {
  return (
    <>
      <ChatProvider>
        <Header />
        <Chat />
        <Footer />
      </ChatProvider>
    </>
  )
}

export default App
