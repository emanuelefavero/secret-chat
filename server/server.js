const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const app = express()

const clientUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5173'
    : 'https://YOUR-APP.com' // ? make sure to change this to your production URL

app.use(
  cors({
    origin: clientUrl,
  })
)

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: clientUrl,
    // methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('sendMessage', (message) => {
    io.emit('message', message) // send message to all connected clients
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
