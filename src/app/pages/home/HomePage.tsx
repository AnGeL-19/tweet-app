import { Trends } from "@/app/components/home/trends/Trends"
import { CreatePost } from "@/app/components/home/tweetPost/CreatePost"
import { WhoFollow } from "@/app/components/home/whoFollow/WhoFollow"
import { PostsList } from "@/app/components/shared/posts/PostsList"
import { PostSkeleton } from "@/app/components/shared/posts/skeleton/PostSkeleton"
import { tweetSservice } from "@/core/domain/services/index.service"
import { useInfiniteQuery} from "@tanstack/react-query"




export const HomePage = () => {



  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage, } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async params => {
      const posts = await tweetSservice.getTweets(params.pageParam);
      return posts;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  });

  return (
    <div className='flex flex-grow gap-6 px-4'>
      <div className='w-full relative'>

        <CreatePost />

        {
          isLoading
          ? <PostSkeleton />
          : <PostsList 
              posts={data?.pages.flat() ?? []} 
              isFetching={isFetchingNextPage} 
              onEndReached={fetchNextPage} 
              hasNextPage={hasNextPage} 
          />
        }
        

      </div>

      <div className='hidden lg:block relative w-[306px]'>
        
        <div className="flex flex-col gap-6 mb-5 sticky top-20">
          <Trends />

          <WhoFollow />
        </div>

      </div>  
    </div>
  )
}
