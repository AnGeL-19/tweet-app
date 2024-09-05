
import { Comment, Post } from "@/core/domain/entities/tweet.entity";
import { createContext } from "react";

export interface PostContext extends PostActions {

    giveLike: () => void;
    giveRetweet: () => void;
    giveSave: () => void;

    handleShowComments: () => void;
    setComments: (data: Comment[]) => void;
}

export interface PostActions extends Omit<Post,  'tweet' | 'date' | 'imgTweet' | 'userRetweet'> {

    showComments: boolean;
}

export const INITAL_VALUES: PostActions = {
    id: '',
    user: null,
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
    handleShowComments: () => {},
    setComments: () => {}
}

export const ContextPost = createContext(INITAL_ACTIONS)