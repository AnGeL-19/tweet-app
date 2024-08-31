import { tweetSservice } from '@/core/domain/services/index.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PostsList } from '../../shared/posts/PostsList';
import { PostSkeleton } from '../../shared/posts/skeleton/PostSkeleton';

export const TabPostListExplore = () => {

    const [searchParams, _] = useSearchParams()

    const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isRefetching} = useInfiniteQuery({
        queryKey: ['posts-explore', 'infinite'],
        initialPageParam: 1,
        // staleTime: 1000 * 60 * 60, // 60 minutes
        queryFn: async params => {
          
            const search = searchParams.get('search');
            const filter = searchParams.get('filter');

            const query = `${filter ? `filter=${filter}` : ''}${search ? `&search=${search}` : ''}`
        
          const posts = await tweetSservice.getTweetsExplore(params.pageParam, query);
          return posts;
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.length === 0) {
            return undefined
          }
          return lastPageParam + 1
        },
    });


    useEffect(() => {
        refetch()    
    }, [searchParams.get('filter'), searchParams.get('search')])
    


  return (
    <div className='w-full'>
        {
          isLoading || isRefetching
          ? <PostSkeleton />
          : <PostsList 
              posts={data?.pages.flat() ?? []} 
              isFetching={isFetchingNextPage} 
              onEndReached={fetchNextPage} 
              hasNextPage={hasNextPage} 
          />
        }
    </div>
  )
}
