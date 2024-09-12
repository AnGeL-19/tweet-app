
import { UserExploreSkeleton } from '../../explore/skeleton/UserExploreSkeleton'
import { UserExplore } from '../../explore/UserExplore'
import { Button } from '../../ui/button'
import { MessageCircle, UserSearch } from 'lucide-react'
import { DataEmpty } from '../../shared/common/DataEmpty'
import { socket } from '@/adapters/http/socket'
import { useAppSelector } from '@/app/context/store/hook'
import { useInfiniteQuery } from '@tanstack/react-query'
import { connectService } from '@/core/domain/services/index.service'

export const UsersWhoWantConnect = () => {

    const user = useAppSelector(state => state.auth.user)

    const {isLoading, data } = useInfiniteQuery({
      queryKey: ['recommend-connect', 'infinite'],
      initialPageParam: 1,
      staleTime: 1000 * 60 * 60, // 60 minutes
      queryFn: async params => {
        const users = await connectService.getPeopleWhoWantConnect(params.pageParam);
        return users;
      },
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return lastPageParam + 1
      },
      
    });


  const handleConnect = ( userToId: string ) => {
    socket.emit('connect-users', {
      userFrom: user,
      userTo: userToId
    })
  }

  return (
    <section>
        <h3 className='text-base font-medium text-darkLight'>People who want to connect with you</h3>
        {/* NOTIFICACIONES DE GENTE QUE QUIERE CONECTAR CONTIGO */}
        <div className='w-full grid grid-cols-auto-fit-users gap-4 mt-3'>

        {
          isLoading
          ? <>
            <UserExploreSkeleton />
            <UserExploreSkeleton />
          </>
          : 
          ( data?.pages.flat().length !== 0 )
          ? 
          <>
            {data?.pages.flat().map( (cn) => (
              <UserExplore key={cn?.id} user={cn!.userFrom}>

                <div className='flex flex-col pt-2'>
                  <span className='inline-block text-sm text-darkLight font-bold mb-2'>This user wants to connect with you</span>
                  <Button size='sm' className='w-fit' onClick={ () => handleConnect(cn?.userFrom.id)}>
                    <MessageCircle className='w-5 h-5 mr-2' />
                    Connect 
                  </Button>
                </div>
                
              </UserExplore>
            ))}
            <div></div>
          </>
          : <DataEmpty text='No users' iconRender={<UserSearch className='w-4 h-4' />}  />
        }
        </div>

      </section>
  )
}
{/* <UserExplore key={cn?.id} user={cn!.userFrom}>

<div className='flex flex-col pt-2'>
  <span className='inline-block text-sm text-darkLight font-bold mb-2'>This user wants to connect with you</span>
  <Button size='sm' className='w-fit' onClick={ () => handleConnect(cn?.userFrom.id)}>
    <MessageCircle className='w-5 h-5 mr-2' />
    Connect 
  </Button>
</div>

</UserExplore> */}