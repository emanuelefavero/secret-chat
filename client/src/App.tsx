import './App.css'
import { useEffect } from 'react'
import io from 'socket.io-client'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'

const socket = io(serverUrl)

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })
  }, [])

  return (
    <>
      <h1 className='text-purple-500'>Secret Chat</h1>
    </>
  )
}

export default App
