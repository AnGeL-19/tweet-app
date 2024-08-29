
import { Comment, CreateComment, CreatePost, Post } from "../domain/entities/tweet.entity";


export interface TweetRepository {

    getComments(id:string, page: number): Promise<Comment[] | null>;
    getTweets(page: number): Promise<Post[] | []>;
    getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []>;
    setLike(id: string): Promise<boolean | null>;
    setLikeComment(): Promise<null>
    setSave(id: string): Promise<boolean | null>;
    setRetweet(id: string): Promise<boolean | null>;
    createComment(id:string, data: CreateComment): Promise<Comment | null>;
    createTweet(data: CreatePost): Promise<Post | null>;
}