import { io } from 'socket.io-client';
const apiUrlSocket = import.meta.env.VITE_API_URL_SOCKET;

export const socket = io(apiUrlSocket,{
    autoConnect: false
});