import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { Heart } from 'lucide-react'
import { formatNumber } from '@/app/lib/formatNumber'
import { Comment as IComment } from '@/core/domain/entities/tweet.entity'
import { useMutation } from '@tanstack/react-query'
import { tweetSservice } from '@/core/domain/services/index.service'
import { CustomError } from '@/core/domain/errors/custom.error'


interface Props {
    comment: IComment
}

export const Comment = ({ comment }: Props) => {

    // const { showComments } = useContext(ContextPost)
    const [isLiked, setIsLiked] = useState(comment.liked)
    const [numLikes, setNumLikes] = useState(comment.numLikes)

    const mutationLikeComment = useMutation({
        mutationFn: (id: string) => tweetSservice.setLikeComment(id),
        onSuccess: ( response ) => {
          // Invalidate and refetch

          if (response) {
            setIsLiked(response)
            setNumLikes(prev => prev + 1)
          }else{
            setIsLiked(response || false)
            setNumLikes(prev => prev - 1)
          }
         
        //   giveLikeComment(comment.id)
    
        },
        onError: (error: CustomError) => {
          console.log(error, 'SI HAY ERRORES', error.getDataValidation());
    
        }
      })

  return (
    <div className='flex gap-4'>
        <Avatar>
            <AvatarImage  src={comment.user.profileImage} />
            <AvatarFallback className='text-black'>{comment.user.name}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
            <div className='p-4 bg-gray rounded-lg'>
            <div className='flex gap-3 items-center mb-2'>
                <span className='text-darkPrimary font-semibold text-sm'>{comment.user.name}</span>
                <span className='font-medium text-xs text-darkLight'>{new Date(comment.date).toDateString()}</span>
            </div>
            <p className='text-base font-normal text-darkPrimary'>
                {comment.comment}
            </p>
            {
                comment.imgComment
                &&
                <div className='w-40 h-56 rounded overflow-hidden mt-2'>
                    <img src={comment.imgComment} className='w-full h-full' alt='cosa' />
                </div>
            }
            </div>
            <div className='flex gap-2 items-center'>
                <Button 
                    onClick={() => mutationLikeComment.mutate(comment.id)}
                    className='p-0 bg-transparent hover:text-redPrimary hover:bg-transparent group' 
                    size='sm' 
                >
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-redPrimary' : 'text-darkLight' }  mr-2 group-hover:text-redPrimary transition-colors duration-300`} />
                    <span className={`text-xs ${isLiked ? 'text-redPrimary' : 'text-darkLight' } font-semibold group-hover:text-redPrimary transition-colors duration-300`}>
                        {isLiked ? 'Liked': 'Like'}
                    </span>
                </Button>
                <span>-</span>
                <span className='text-xs text-darkLight font-semibold'>
                {
                    formatNumber(numLikes, 'like')
                }
                </span>
            </div>
        </div>
    </div>
  )
}
