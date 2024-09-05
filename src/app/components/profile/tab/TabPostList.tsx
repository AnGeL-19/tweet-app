
import { tweetSservice } from '@/core/domain/services/index.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { PostSkeleton } from '../../shared/posts/skeleton/PostSkeleton'
import { PostsList } from '../../shared/posts/PostsList'



export const TabPostList = () => {

    const { id } = useParams()
    
    const [searchParams, _] = useSearchParams()

    const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isRefetching} = useInfiniteQuery({
        queryKey: ['posts-profile', 'infinite'],
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60, // 60 minutes
        queryFn: async params => {
          const posts = await tweetSservice.getTweetsByUser(id!, params.pageParam, searchParams.get('filter') || '');
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
    }, [id, searchParams.get('filter')])
    


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
