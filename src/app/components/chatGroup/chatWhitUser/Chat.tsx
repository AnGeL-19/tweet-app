import { useEffect } from 'react'
import { Message } from './Message'
import { socket } from '@/adapters/http/socket';


export const Chat = () => {

  useEffect(() => {

    socket.on('chat to', (msg) => {
      console.log('message to ', msg);
    });
  
    return () => {
      socket.off('chat to')
    }
    
  }, [])
  


  return (
    <div className='w-full max-h-screen pt-3 overflow-y-auto'>
        <div className='flex flex-col justify-end items-start gap-4 pr-1 mb-5'>

            <Message  />

            <Message  />

            <Message  />

            <Message  />

            <Message  />

            <Message  />
            
        </div>
    </div>
  )
}
