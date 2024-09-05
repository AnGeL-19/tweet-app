

import React, { useState } from 'react'
import { ContextPost, PostActions } from './contextPost'
import { Comment, type Post as IPost } from '@/core/domain/entities/tweet.entity';

interface Props {
  post: IPost;
  children: React.ReactNode;
}

export const PostProvider = ({ post , children }:Props) => {

  const [valuesPost, setValuesPost] = useState<PostActions>({
    id: post.id,
    user: post.user,
    liked: post.liked,
    saved: post.saved,
    retweeted: post.retweeted,
    numLikes: post.numLikes,
    numRetweets: post.numRetweets,
    numSaved: post.numSaved,
    numComments: post.numComments,
    showComments: false
  })

  const giveLike = () => {
    setValuesPost(prev => ({
      ...prev,
      liked: !prev.liked,
      numLikes: !prev.liked ? prev.numLikes+1 : prev.numLikes-1
    }))
  }

  const giveRetweet = () => {
    setValuesPost(prev => ({
      ...prev,
      retweeted: !prev.retweeted,
      numRetweets: !prev.retweeted ? prev.numRetweets+1 : prev.numRetweets-1
    }))
  }

  const giveSave = () => {
    setValuesPost(prev => ({
      ...prev,
      saved: !prev.saved,
      numSaved: !prev.saved ? prev.numSaved+1 : prev.numSaved-1
    }))
  }

  const setComments = (data: Comment[]) => {
    setValuesPost((prev) => ({
      ...prev,
      comments: data
    }))
  }


  const handleShowComments = () => {

    setValuesPost(prev => ({
      ...prev,
      showComments: !prev.showComments
    }))
  }

  return (
    <ContextPost.Provider
        value={{
          ...valuesPost,
          giveLike,
          giveRetweet,
          giveSave,
          handleShowComments,
          setComments
        }}
    >
      {children}
    </ContextPost.Provider>
  )
}
