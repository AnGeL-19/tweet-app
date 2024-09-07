import { Message } from './Message'


export const Chat = () => {



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
