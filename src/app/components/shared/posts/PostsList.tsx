
import { Post } from './Post'
import { PostProvider } from '@/app/context/post/PostProvider'
import { type Post as IPost } from '@/core/domain/entities/tweet.entity'
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll'
import { PostSkeleton } from './skeleton/PostSkeleton'
import { DataEmpty } from '../DataEmpty'

interface Props {
  posts: IPost[],
  onEndReached?: () => void,
  isFetching: boolean,
  hasNextPage: boolean
}

export const PostsList = ({ posts, onEndReached, isFetching, hasNextPage }: Props) => {

  // const location = useLocation()
  // const [searchParams, _] = useSearchParams()

  // useEffect(() => {

  //   console.log(location, searchParams);
    
  // }, [searchParams])

  const { ref } = useInfiniteScroll({
    fn:  onEndReached ?? function(){},
    threshold: 1
  })
  

  return (
    <section className='flex flex-col gap-6 w-full'>

      {
        posts && posts.length !== 0
        ?
          posts.map((post) => (
            <PostProvider key={post.id} post={post}>
              <Post post={post} />
            </PostProvider>
          ))
          
        :
        <DataEmpty text='No tweets' />
      }
      
      {
        isFetching && <PostSkeleton />
      }

      {
        hasNextPage && <div ref={ref}></div>
      }

    </section>
  )
}
