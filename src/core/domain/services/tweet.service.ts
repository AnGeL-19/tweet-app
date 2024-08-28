import { TweetRepository } from "@/core/ports/tweet.repository";
import { Trend } from "../entities/trend.entity";
import { CreatePost, Post } from "../entities/tweet.entity";


export class TweetService implements TweetRepository {

    constructor(private tweetRepository: TweetRepository ) {}
    

    async getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []> {

        return this.tweetRepository.getTweetsByUser(id, page, query);
        
    }

    async getTweets(page: number): Promise<Post[] | []> {

        console.log(page, '----');
        

        return this.tweetRepository.getTweets(page)
    }

    setLike(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    setLikeComment(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    setSave(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    setRetweet(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    createComment(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
    async createTweet(values: CreatePost): Promise<Post | null> {

        return await this.tweetRepository.createTweet(values)

    }
    
}