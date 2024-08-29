import { IComment, IPost } from "@/app/interfaces/post.interface";
import { Comment, Post } from "@/core/domain/entities/tweet.entity";
import { createContext } from "react";

export interface PostContext extends PostActions {
    createComment: (data: Comment) => void;
    giveLike: () => void;
    giveRetweet: () => void;
    giveSave: () => void;
    giveLikeComment: (commentId: string) => void;
    handleShowComments: () => void;
    setComments: (data: Comment[]) => void;
}

export interface PostActions extends Omit<Post,  'tweet' | 'date' | 'imgTweet' | 'userRetweet'> {
    comments: Comment[],
    showComments: boolean;
}

export const INITAL_VALUES: PostActions = {
    id: '',
    user: null,
    comments: [],
    liked: false,
    retweeted: false,
    saved: false,
    numComments: 0,
    numRetweets: 0,
    numSaved: 0,
    numLikes: 0,
    showComments: false
}

export const INITAL_ACTIONS: PostContext = {
    ...INITAL_VALUES,
    giveLike: () => {},
    giveRetweet: () => {},
    giveSave: () => {},
    giveLikeComment: () => {},
    createComment: () => {},
    handleShowComments: () => {},
    setComments: () => {}
}

export const ContextPost = createContext(INITAL_ACTIONS)