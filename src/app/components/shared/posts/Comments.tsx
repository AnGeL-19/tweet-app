import React, { useContext, useEffect, useRef } from 'react'
import { Separator } from '../../ui/separator'
import { Comment } from './Comment'
import { IComment } from '@/app/interfaces/post.interface'
import { ContextPost } from '@/app/context/post/contextPost'


export const Comments = () => {

  const { setComments, comments } = useContext(ContextPost)

  useEffect(() => {
    setComments([
      {
        id: 'c4123',
        comment: 'commente asd w qeas d  dasdddd asdqwsca s',
        date: new Date().toDateString(),
        imgComment: '',
        numLikes: 123,
        liked: true,
        user: {
          id: 'u41232',
          name: 'Angel Muñoz',
          profileImage: 'https://github.com/shadcn.png'
        }
      }
    ])
  }, [])
  

  return (
    <div>
        <Separator className='mt-2 mb-5' />

        {
          comments.map( (comment) => <Comment key={comment.id} comment={comment} /> )
        }

    </div>
  )
}
