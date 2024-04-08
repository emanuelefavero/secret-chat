import Header from './Header'
import Chat from './Chat'
import Footer from './Footer'
import ClearChatAnimation from './ClearChatAnimation'

export default function Layout() {
  return (
    <>
      <ClearChatAnimation />
      <Header />
      <div className='flex justify-center px-4'>
        <main className='w-full max-w-screen-lg pb-24 pt-28'>
          <Chat />
        </main>
      </div>
      <Footer />
    </>
  )
}
