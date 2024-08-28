import { UserAvatar } from "./user.entity";


export interface Post {
    id: string;
    tweet: string;
    user: UserAvatar
    date: Date;
    imgTweet: string;
    numRetweets: number;
    numLikes: number;
    numComments: number;
    numSaved: number;
    liked: boolean;
    saved: boolean;
    retweeted: boolean;
    userRetweet: string | null
}

export interface CreatePost extends Pick<Post, 'tweet' > {
    image?: File | null
    accesibility: boolean
}

export interface Comment {
    id: string;
    user: UserAvatar
    comment: string;
    date: string;
    imgComment: string | null;
    numLikes: number;
    liked: boolean;
}

