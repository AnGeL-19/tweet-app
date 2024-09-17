import { Chat } from '@/app/components/chatGroup/chatWhitUser/Chat'
import { FormMessageUser } from '@/app/components/chatGroup/chatWhitUser/FormMessageUser'
import { HeaderChat } from '@/app/components/chatGroup/chatWhitUser/HeaderChat'
import { userService } from '@/core/domain/services/index.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'


export const ChatWhitUser = () => {

  const { user_id } = useParams()

  const { data, isLoading, isRefetching } = useQuery({ 
    queryKey: ['chat-user', user_id], queryFn: () => userService.getUserById(user_id || ''),
    staleTime: 1000 * 60 * 60, // 60 minutes 
  })


  return (
    <main className='w-full h-full flex flex-col'>

      {
        isLoading || isRefetching
        ? <span>Loading...</span>
        : <HeaderChat img={data!.profileImage} name={data!.name}  />
      }
      

      <section className='w-full h-full flex flex-col justify-end'>
        
        <Chat />
        
        <FormMessageUser />

      </section>
    </main>
  )
}
