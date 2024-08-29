import { UserAvatar } from "./user.entity";


export interface Post {
    id: string;
    tweet: string;
    user: UserAvatar | null
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

export interface CreateComment extends Pick<Comment, 'comment' > {
    image?: File | null
}

export interface Comment {
    id: string;
    idPost: string;
    user: UserAvatar
    comment: string;
    date: Date;
    imgComment: string | null;
    numLikes: number;
    liked: boolean;
}


