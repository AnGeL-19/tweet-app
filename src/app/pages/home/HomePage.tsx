import { Trends } from "@/app/components/home/trends/Trends"
import { CreatePost } from "@/app/components/home/tweetPost/CreatePost"
import { WhoFollow } from "@/app/components/home/whoFollow/WhoFollow"
import { PostsList } from "@/app/components/shared/posts/PostsList"
import { PostSkeleton } from "@/app/components/shared/posts/skeleton/PostSkeleton"
import { useAppSelector } from "@/app/context/store/hook"
import { useScrollSticky } from "@/app/hooks/useScrollSticky"
import { tweetSservice } from "@/core/domain/services/index.service"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"




export const HomePage = () => {

  const user = useAppSelector( state => state.auth.user )
  

  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isRefetching } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async params => {
      const posts = await tweetSservice.getTweets(params.pageParam);
      return posts;
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    
  });

  // useEffect(() => {
  //   refetch()
  // }, [user?.id])

  const { positionTopDown } = useScrollSticky()

  return (
    <div className='flex flex-grow gap-6 px-4 '>
      <div className='w-full relative' >

        <CreatePost />

        { 
          isLoading || isRefetching
          ? <PostSkeleton />
          : <PostsList 
              posts={ data?.pages.flat() ?? []} 
              isFetching={isFetchingNextPage} 
              onEndReached={fetchNextPage} 
              hasNextPage={hasNextPage} 
          />
        }
        

      </div>

      <div className='hidden lg:block relative w-[306px] min-h-screen '>
        
        <div className={`h-fit mb-10 sticky top-0 transition ease-in-out delay-75 ${ positionTopDown !== null ? positionTopDown ? 'translate-y-20' : '-translate-y-10' : 'translate-y-0' } duration-150`}>
         
          <div className="flex flex-col gap-6 flex-grow">

            <Trends />

            <WhoFollow />

          </div>

        </div>

      </div>  
    </div>
  )
}
