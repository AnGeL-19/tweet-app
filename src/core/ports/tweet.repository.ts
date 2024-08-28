
import { CreatePost, Post } from "../domain/entities/tweet.entity";


export interface TweetRepository {

    getTweets(page: number): Promise<Post[] | []>;
    getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []>;
    setLike(): Promise<null>;
    setLikeComment(): Promise<null>
    setSave(): Promise<null>;
    setRetweet(): Promise<null>;
    createComment(): Promise<null>;
    createTweet(data: CreatePost): Promise<Post | null>;
}