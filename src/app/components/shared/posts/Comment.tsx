import React, { useContext, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { Heart } from 'lucide-react'
import { IComment } from '@/app/interfaces/post.interface'
import { formatNumber } from '@/app/lib/formatNumber'
import { ContextPost } from '@/app/context/post/contextPost'

interface Props {
    comment: IComment
}

export const Comment = ({ comment }: Props) => {

    console.log(comment);
    
    const { giveLikeComment } = useContext(ContextPost)

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
                <span className='font-medium text-xs text-darkLight'>{comment.date}</span>
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
                onClick={() => giveLikeComment(comment.id)}
                className='p-0 bg-transparent hover:text-redPrimary hover:bg-transparent group' 
                size='sm' 
            >
                <Heart className={`w-4 h-4 ${comment.liked ? 'text-redPrimary' : 'text-darkLight' }  mr-2 group-hover:text-redPrimary transition-colors duration-300`} />
                <span className={`text-xs ${comment.liked ? 'text-redPrimary' : 'text-darkLight' } font-semibold group-hover:text-redPrimary transition-colors duration-300`}>
                    {comment.liked ? 'Liked': 'Like'}
                </span>
            </Button>
            <span>-</span>
            <span className='text-xs text-darkLight font-semibold'>
                {formatNumber(comment.numLikes, 'like')}
                </span>
            </div>
        </div>
    </div>
  )
}
