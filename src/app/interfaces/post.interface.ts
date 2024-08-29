import { IUser } from "./user.interface";


export interface IPost {
    id: string;
    tweet: string;
    user: IUserAvatar | null
    date: string;
    imgTweet: string;
    numRetweets: number;
    numLikes: number;
    numComments: number;
    numSaved: number;
    liked: boolean;
    saved: boolean;
    retweeted :boolean;
}

export interface IComment {
    id: string;
    user: IUserAvatar
    comment: string;
    date: string;
    imgComment: string | null;
    numLikes: number;
    liked: boolean;
}

export type IUserAvatar = Pick<IUser, 'id' | 'name' | 'profileImage'>