import io from 'socket.io-client'

// TODO check for dev or prod, add proper server url depending on that @see https://vitejs.dev/guide/env-and-mode
const serverUrl = 'http://localhost:4000'
export const socket = io(serverUrl)
