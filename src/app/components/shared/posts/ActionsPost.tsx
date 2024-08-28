import React, { useContext } from 'react'
import { Button } from '../../ui/button'
import { Bookmark, Heart, MessageSquare, Repeat2 } from 'lucide-react'
import { ContextPost } from '@/app/context/post/contextPost'



export const ActionsPost = () => {

  const { handleShowComments, 
    giveLike,
    giveRetweet, 
    giveSave, 
    liked, 
    retweeted, 
    saved,
    showComments
  } = useContext(ContextPost)

  return (
    <div className='w-full flex'>
        <Button 
          onClick={handleShowComments}
          className={`w-1/4 flex gap-3 ${showComments ? 'bg-zinc-100' : 'bg-transparent'} hover:bg-zinc-100`}
          >
          <MessageSquare className=' h-5 w-5 text-darkLight' />
          <span className='hidden sm:flex text-darkLight'>Comment</span>
        </Button>

        <Button
          onClick={giveRetweet} 
          className={`w-1/4 flex gap-3 bg-transparent ${retweeted ? 'hover:bg-green-100' : 'hover:bg-zinc-100'}`}>
          <Repeat2 className={`h-5 w-5 ${ retweeted ? 'text-greenPrimary' : 'text-darkLight'}`}  />
          <span className={`hidden sm:flex ${retweeted ? 'text-greenPrimary' : 'text-darkLight'}`}>{ retweeted ? 'Retweeted' : 'Retweet' }</span>
        </Button>

        <Button 
          onClick={giveLike}
          className={`w-1/4 flex gap-3 bg-transparent ${ liked ? 'hover:bg-red-100' : 'hover:bg-zinc-100' }`}>
          <Heart className={`h-5 w-5 ${ liked ? 'text-redPrimary' : 'text-darkLight' }`}  />
          <span className={`hidden sm:flex  ${ liked ? 'text-redPrimary' : 'text-darkLight' }`}>{liked ? 'Liked' : 'Like'}</span>
        </Button>

        <Button 
          onClick={giveSave}
          className={`w-1/4 flex gap-3 bg-transparent ${ saved ? 'hover:bg-blue-100' : 'hover:bg-zinc-100' }`}>
          <Heart className={`h-5 w-5 ${ saved ? 'text-blueSave' : 'text-darkLight' }`}  />
          <span className={`hidden sm:flex  ${ saved ? 'text-blueSave' : 'text-darkLight' }`}>{saved ? 'Saved' : 'Save'}</span>
        </Button>
    </div>
  )
}
