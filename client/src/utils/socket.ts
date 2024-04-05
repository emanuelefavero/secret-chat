import io from 'socket.io-client'
import { serverUrl } from '@/config/serverUrl'

export const socket = io(serverUrl)
