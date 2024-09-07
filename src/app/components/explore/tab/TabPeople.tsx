import { userService } from '@/core/domain/services/index.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { UserExplore } from '../UserExplore';
import { UserExploreSkeleton } from '../skeleton/UserExploreSkeleton';
import { DataEmpty } from '../../shared/common/DataEmpty';
import { MessageCircle, UserSearch } from 'lucide-react';
import { Button } from '../../ui/button';

export const TabPeople = () => {

    const [searchParams, _] = useSearchParams()

    const {isLoading, data, refetch, isRefetching} = useInfiniteQuery({
        queryKey: ['people', 'infinite'],
        initialPageParam: 1,
        // staleTime: 1000 * 60 * 60, // 60 minutes
        
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

        </section>
    </div>
  )
}
