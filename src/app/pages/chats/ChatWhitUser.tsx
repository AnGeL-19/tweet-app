import { Chat } from '@/app/components/chatGroup/chatWhitUser/Chat'
import { FormMessageUser } from '@/app/components/chatGroup/chatWhitUser/FormMessageUser'
import { HeaderChat } from '@/app/components/chatGroup/chatWhitUser/HeaderChat'


export const ChatWhitUser = () => {


  return (
    <main className='w-full h-full flex flex-col'>

      <HeaderChat />

      <section className='w-full h-full flex flex-col justify-end'>
        
        <Chat />
        
        <FormMessageUser />

      </section>
    </main>
  )
}
