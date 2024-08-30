import { TweetRepository } from "@/core/ports/tweet.repository";
import { Comment, CreateComment, CreatePost, Post } from "../entities/tweet.entity";


export class TweetService implements TweetRepository {

    constructor(private tweetRepository: TweetRepository ) {}

    async getTweetsExplore(page: number, query: string): Promise<Post[] | []> {
        return this.tweetRepository.getTweetsExplore(page, query)
    }

    async getTweetsBookmarks(page: number, query: string): Promise<Post[] | []> {
        return this.tweetRepository.getTweetsBookmarks(page, query)
    }

    async getComments(id: string, page: number): Promise<Comment[] | null> {
        return await this.tweetRepository.getComments(id, page)
    }

    async getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []> {

        return this.tweetRepository.getTweetsByUser(id, page, query);
        
    }

    async getTweets(page: number): Promise<Post[] | []> {

        return this.tweetRepository.getTweets(page)
    }

    async setLike(id: string): Promise<boolean | null> {
        return this.tweetRepository.setLike(id)
    }

    setLikeComment(id : string): Promise<boolean | null> {
        return this.tweetRepository.setLikeComment(id)
    }

    async setSave(id: string): Promise<boolean | null> {
        return this.tweetRepository.setSave(id)
    }

    async setRetweet(id: string): Promise<boolean | null> {
        return this.tweetRepository.setRetweet(id)
    }

    async createComment(id:string, data: CreateComment): Promise<Comment | null> {

        console.log('entra', id, data);
        
        return this.tweetRepository.createComment(id, data)
    }
    
    async createTweet(values: CreatePost): Promise<Post | null> {

        return await this.tweetRepository.createTweet(values)

    }
    
}