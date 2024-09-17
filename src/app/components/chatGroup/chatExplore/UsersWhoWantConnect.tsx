
import { UserExploreSkeleton } from '../../explore/skeleton/UserExploreSkeleton'
import { UserExplore } from '../../explore/UserExplore'

import {  UserSearch } from 'lucide-react'
import { DataEmpty } from '../../shared/common/DataEmpty'

import { useInfiniteQuery } from '@tanstack/react-query'
import { connectService } from '@/core/domain/services/index.service'
import { ButtonConnect } from '../../shared/common/ButtonConnect'

export const UsersWhoWantConnect = () => {



    const {isLoading, data } = useInfiniteQuery({
      queryKey: ['recommend-connect', 'infinite'],
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5,  // Los datos son frescos por 5 minutos (5 minutos sin refetch)
      // cacheTime: 1000 * 60 * 30, // Mantén los datos en caché por 30 minutos
      refetchOnWindowFocus: false,  // No refetch cuando vuelves a la ventana
      refetchOnReconnect: false,    // No refetch al reconectar a internet
      refetchOnMount: false,
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



  return (
    <section>
        <h3 className='text-base font-medium text-darkLight'>People who want to connect with you</h3>
 
        <div className='w-full grid grid-cols-auto-fit-users gap-4 mt-3'>

        {
          isLoading
          ? <UserExploreSkeleton />
          : 
          ( data?.pages.flat().length !== 0 )
          ? 
          <>
            {data?.pages.flat().map( (cn) => (
              <UserExplore key={cn.id} user={cn!.userFrom}>

                <div className='flex flex-col pt-2'>
                  <span className='inline-block text-sm text-darkLight font-bold mb-2'>This user wants to connect with you</span>
                  <ButtonConnect userToId={cn.userFrom.id} />
                </div>
                
              </UserExplore>
            ))}
            <div key={'empty'}></div>
          </>
          : <DataEmpty text='No users' iconRender={<UserSearch className='w-4 h-4' />}  />
        }
        </div>

      </section>
  )
}
