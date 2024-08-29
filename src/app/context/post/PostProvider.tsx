

import React, { useState } from 'react'
import { ContextPost, PostActions } from './contextPost'
import { IComment } from '@/app/interfaces/post.interface'
import { Comment, type Post as IPost } from '@/core/domain/entities/tweet.entity';

interface Props {
  post: IPost;
  children: React.ReactNode;
}

export const PostProvider = ({ post , children }:Props) => {

  const [valuesPost, setValuesPost] = useState<PostActions>({
    id: post.id,
    user: post.user,
    comments: [],
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
    console.log('dar giveLike');
    setValuesPost(prev => ({
      ...prev,
      liked: !prev.liked,
      numLikes: !prev.liked ? prev.numLikes+1 : prev.numLikes-1
    }))
  }

  const giveRetweet = () => {
    console.log('dar giveRetweet');
    setValuesPost(prev => ({
      ...prev,
      retweeted: !prev.retweeted,
      numRetweets: !prev.retweeted ? prev.numRetweets+1 : prev.numRetweets-1
    }))
  }

  const giveSave = () => {
    console.log('dar giveSave');
    setValuesPost(prev => ({
      ...prev,
      saved: !prev.saved,
      numSaved: !prev.saved ? prev.numSaved+1 : prev.numSaved-1
    }))
  }

  const createComment = (data: Comment) => {
    console.log('dar createComment');
    
    setValuesPost((prev) => ({
      ...prev,
      comments: [...prev.comments, data]
    }))

  }

  const setComments = (data: Comment[]) => {
    setValuesPost((prev) => ({
      ...prev,
      comments: data
    }))
  }

  const giveLikeComment = (commentId: string) => {
    console.log('dar giveLikeComment', commentId);

    setValuesPost((prev) => ({
      ...prev,
      comments: prev.comments.map( (comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            numLikes: !comment.liked ? comment.numLikes+1 : comment.numLikes-1
          }
        }else{
          return comment
        }
      })
    }))

  }

  const handleShowComments = () => {
    console.log('show commments');
    
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
          createComment,
          giveLikeComment,
          handleShowComments,
          setComments
        }}
    >
      {children}
    </ContextPost.Provider>
  )
}
