
import {CommentsResponse, CreateTweetCommentResponse, TweetLikedResponse, TweetResponse, TweetRetweetedResponse, TweetSavedResponse, TweetsResponse } from "../responses/tweet.response";
import { Comment, Post } from "@/core/domain/entities/tweet.entity";


export class TweetMapper {

    static mapperTweetLiked( response: TweetLikedResponse ): boolean {

        const {  isLiked  } = response;

        return isLiked 

    }

    static mapperTweetRetweeted( response: TweetRetweetedResponse ): boolean {

        const {  isRetweeted  } = response;

        return isRetweeted 

    }

    static mapperTweetSaved( response: TweetSavedResponse ): boolean {

        const {  isSaved  } = response;

        return isSaved 

    }

    static mapperTweets( response: TweetsResponse ): Post[] {

        const { data  } = response;

        return  data.map( (tweet) => ({
            id: tweet.tid,
            date: tweet.date,
            imgTweet: '',
            liked: tweet.liked,
            saved: tweet.saved,
            retweeted: tweet.retweeted,
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

    static mapperComment( response: CreateTweetCommentResponse ): Comment | null {
        
        const { comment } = response

        return {
            id: comment.cid,
            comment: comment.commentText,
            date: comment.date,
            idPost: comment.tweetComment,
            imgComment: '',
            liked: true,
            numLikes: comment.nLikes,
            user: {
                id: comment.userComment.uid,
                name: comment.userComment.name,
                profileImage: comment.userComment.imgUser
            }
        }

    }

    static mapperComments( response: CommentsResponse ): Comment[] | null {
        
        const { comments } = response

        return comments.map( comment => ({
            id: comment.cid,
            comment: comment.commentText,
            date: comment.date,
            idPost: comment.tweetComment,
            imgComment: '',
            liked: true,
            numLikes: comment.nLikes,
            user: {
                id: comment.userComment.uid,
                name: comment.userComment.name,
                profileImage: comment.userComment.imgUser
            }
        }) )

    }

}