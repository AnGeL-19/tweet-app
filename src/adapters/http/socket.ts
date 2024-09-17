import { io } from 'socket.io-client';
const apiUrlSocket = import.meta.env.VITE_API_URL_SOCKET;

const token = window.localStorage.getItem('token') || ''

export const socket =  io(apiUrlSocket,{
    transports: ['polling'],
    autoConnect: false,
    withCredentials: true, // Asegúrate de enviar las credenciales
    extraHeaders: {
        "authorization": token
    }
});

  