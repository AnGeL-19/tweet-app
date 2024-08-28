
import {TweetResponse, TweetsResponse } from "../responses/tweet.response";
import { Post } from "@/core/domain/entities/tweet.entity";


export class TweetMapper {


    static mapperTweets( response: TweetsResponse ): Post[] {

        const { data  } = response;

        return  data.map( (tweet) => ({
            id: tweet.tid,
            date: tweet.date,
            imgTweet: '',
            liked: false,
            saved: false,
            retweeted: false,
            tweet: tweet.description,
            user: {
                id: tweet.userTweet.uid,
                name: tweet.userTweet.name,
                profileImage: tweet.userTweet.imgUser
            },
            userRetweet: null,
            numComments: tweet.nComentPeople,
            numLikes: tweet.nLikes,
            numRetweets: tweet.nRetweets,
            numSaved: tweet.nSaved
        }))

    }

    static mapperTweet( response: TweetResponse ): Post {
        

        return  {
            id: response.tid,
            date: response.date,
            imgTweet: '',
            liked: false,
            saved: false,
            retweeted: false,
            tweet: response.description,
            user: {
                id: response.userTweet.uid,
                name: response.userTweet.name,
                profileImage: response.userTweet.imgUser
            },
            userRetweet: null,
            numComments: response.nComentPeople,
            numLikes: response.nLikes,
            numRetweets: response.nRetweets,
            numSaved: response.nSaved
        }

    }

}