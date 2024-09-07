import { useContext } from 'react'
import { Separator } from '../../ui/separator'
import { Comment } from './Comment'
import { ContextPost } from '@/app/context/post/contextPost'
import { useInfiniteQuery } from '@tanstack/react-query'
import { tweetSservice } from '@/core/domain/services/index.service'
import { CommentSkeleton } from './skeleton/CommentSkeleton'
import { Button } from '../../ui/button'
import { DataEmpty } from '../common/DataEmpty'


export const Comments = () => {

  const { id, showComments } = useContext(ContextPost)
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments', id],
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 60, // 60 minutes
    enabled: showComments,
    queryFn: async params => {
      const comments = await tweetSservice.getComments(id,params.pageParam);
      return comments;
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  });

  return (
    <div>
        <Separator className='mt-2 mb-5' />

        {
          isLoading
          ? <CommentSkeleton />
          : data?.pages.flat().length === 0
            ? <DataEmpty text='No comments' />
            : data?.pages.flat().map( (comment) => <Comment key={comment?.id} comment={comment!} /> )
        }

      {
        isFetchingNextPage && <CommentSkeleton />
      }

      {
        hasNextPage 
        &&
        <div className='w-full flex justify-center'>
          <Button className='text-xs bg-transparent px-4 text-darkPrimary hover:text-white' 
            size='sm'
            onClick={() => fetchNextPage()}
          >
            show more
          </Button>
        </div> 
      }

    </div>
  )
}
