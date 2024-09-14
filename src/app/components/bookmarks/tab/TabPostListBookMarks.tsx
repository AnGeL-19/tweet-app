
import { tweetSservice } from '@/core/domain/services/index.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { PostSkeleton } from '../../shared/posts/skeleton/PostSkeleton'
import { PostsList } from '../../shared/posts/PostsList'



export const TabPostListBookMarks = () => {

    const { id } = useParams()
    
    const [searchParams, _] = useSearchParams()

    const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isRefetching} = useInfiniteQuery({
        queryKey: ['posts-bookmarks', 'infinite'],
        initialPageParam: 1,
        staleTime: 1000 * 60 * 10,  // Los datos son frescos por 10 minutos (5 minutos sin refetch)
        // cacheTime: 1000 * 60 * 30, // Mantén los datos en caché por 30 minutos
        refetchOnWindowFocus: false,  // No refetch cuando vuelves a la ventana
        refetchOnReconnect: false,    // No refetch al reconectar a internet
        refetchOnMount: false,
        queryFn: async params => {
          const posts = await tweetSservice.getTweetsBookmarks(params.pageParam, searchParams.get('filter') || '');
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
