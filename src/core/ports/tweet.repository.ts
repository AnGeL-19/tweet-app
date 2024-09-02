
import { Comment, CreateComment, CreatePost, Post } from "../domain/entities/tweet.entity";


export interface TweetRepository {

    getTweetsExplore(page: number, query: string): Promise<Post[] | []>;
    getTweetsBookmarks(page: number, query: string): Promise<Post[] | []>;
    getComments(id:string, page: number): Promise<Comment[] | null>;
    getTweets(page: number): Promise<Post[] | []>;
    getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []>;
    setLike(id: string): Promise<boolean | null>;
    setLikeComment(id: string): Promise<boolean | null>
    setSave(id: string): Promise<boolean | null>;
    setRetweet(id: string): Promise<boolean | null>;
    createComment(id:string, data: FormData): Promise<Comment | null>;
    createTweet(data: FormData): Promise<Post | null>;

}