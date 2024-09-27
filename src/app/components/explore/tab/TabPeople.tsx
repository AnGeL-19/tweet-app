import { userService } from '@/core/domain/services/index.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { UserExplore } from '../UserExplore';
import { UserExploreSkeleton } from '../skeleton/UserExploreSkeleton';
import { DataEmpty } from '../../shared/common/DataEmpty';
import { UserSearch } from 'lucide-react';
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll';


export const TabPeople = () => {

    const [searchParams, _] = useSearchParams()

    const {isLoading, data, refetch, isRefetching, isFetching, hasNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey: ['people', 'infinite'],
        initialPageParam: 1,
        staleTime: 1000 * 60 * 10,  // Los datos son frescos por 10 minutos (10 minutos sin refetch)
        // cacheTime: 1000 * 60 * 30, // Mantén los datos en caché por 30 minutos
        refetchOnWindowFocus: false,  // No refetch cuando vuelves a la ventana
        refetchOnReconnect: false,    // No refetch al reconectar a internet
        refetchOnMount: false,
        queryFn: async params => {
          
            const search = searchParams.get('search');

            const query = `${search ? `&search=${search}` : ''}`
        
          const posts = await userService.getUsers(params.pageParam, query);
          return posts;
        },
        getNextPageParam: (lastPage, _, lastPageParam) => {
          if (lastPage.length === 0) {
            return undefined
          }
          return lastPageParam + 1
        },
    });

    const { ref } = useInfiniteScroll({
      fn:  fetchNextPage,
      threshold: .4
    })

    useEffect(() => {
        refetch()    
    }, [searchParams.get('search')])
  
  return (
    <div className='w-full'>

        <section className='w-full grid grid-cols-auto-fit-users gap-4 '>
        {
          isLoading || isRefetching
          ? <>
            <UserExploreSkeleton />
            <UserExploreSkeleton />
          </>
          : 
          ( data?.pages.flat().length !== 0 )
          ? 
          <>
            {data?.pages.flat().map( (user) => (
              <UserExplore key={user.id} user={user} />
            ) )}
            <div></div>
          </>
          : <DataEmpty text='No users' iconRender={<UserSearch className='w-4 h-4' />}  />
        }

      {
        isFetching &&
        <>
          <UserExploreSkeleton />
          <UserExploreSkeleton />
        </>
      }

      {
        hasNextPage && <div ref={ref}></div>
      }

        </section>
    </div>
  )
}
