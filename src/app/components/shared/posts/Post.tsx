
import { useContext } from 'react'
import { UserAvatar } from '../user/UserAvatar'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { cn } from '@/app/lib/utils'
import { Separator } from '../../ui/separator'
import { FormComment } from './FormComment'
import { Comments } from './Comments'
import { ActionsPost } from './ActionsPost'
import { InteractionsPost } from './InteractionsPost'
import { ContentPost } from './ContentPost'
import { InfoRetweet } from './InfoRetweet'
import { ContextPost } from '@/app/context/post/contextPost'
import { type Post as IPost } from '@/core/domain/entities/tweet.entity'

interface Props{
  post: IPost
}

export const Post = ({ post }:Props) => {

  const { showComments, numLikes, numComments, numRetweets, numSaved } = useContext(ContextPost)

  return (
    <div>
        { post.userRetweet && <InfoRetweet name={post.userRetweet || ''} /> }
        <article>
          <Card className={cn("w-full bg-white p-5 rounded-lg shadow")} >
              <CardHeader className='p-0'>
                <UserAvatar 
                  user={post.user!} 
                  info={new Date(post.date).toDateString() || ''}
                />
              </CardHeader>
              <CardContent className='p-0'>

                <ContentPost description={post.tweet} img={post.imgTweet} />

                <InteractionsPost 
                  numLikes={numLikes} 
                  numComments={numComments} 
                  numRetweets={numRetweets} 
                  numSaved={numSaved} 
                />

                <Separator className='my-2' />

                <ActionsPost />

                <Separator className='my-2' />

                <FormComment />

                {
                  showComments
                  &&
                  <Comments />
                }
                
              </CardContent>
          </Card>
          
        </article>
    </div>
  )
}
