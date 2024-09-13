
import { UsersWhoWantConnect } from '@/app/components/chatGroup/chatExplore/UsersWhoWantConnect'


export const ChatPage = () => {

 

  return (
    <main className='flex flex-col gap-5'>
      <h2 className='text-xl font-medium text-darkPrimary'>Explore and connect with others</h2>

      <UsersWhoWantConnect />

    </main>
  )
}
