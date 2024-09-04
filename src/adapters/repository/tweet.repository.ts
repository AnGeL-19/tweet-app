import { TweetRepository } from "@/core/ports/tweet.repository";

import { tweetApi } from "../http/api";
import axios from "axios";
import { CustomError } from "@/core/domain/errors/custom.error";
import { TweetMapper } from "../mappers/mapper/tweet.mapper";
import {  CommentLikedResponse, CommentsResponse, CreatedTweetResponse, CreateTweetCommentResponse, TweetLikedResponse, TweetRetweetedResponse, TweetSavedResponse, TweetsResponse } from "../mappers/responses/tweet.response";
import { Comment, CreateComment, CreatePost, Post } from "@/core/domain/entities/tweet.entity";


export class HttpTweetRepository implements TweetRepository {

    async getTweetsExplore(page: number, query: string): Promise<Post[] | []> {
        
        try {

            const { data } = await tweetApi.get<TweetsResponse>(`tweets/explore?page=${page}&${query}`)
            
            return TweetMapper.mapperTweets(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async getTweetsBookmarks(page: number, query: string): Promise<Post[] | []> {
        try {

            const { data } = await tweetApi.get<TweetsResponse>(`tweets/bookmarks?page=${page}&filter=${query}`)
            
            return TweetMapper.mapperTweets(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async getComments(id:string, page: number): Promise<Comment[] | null> {
        try {

            const { data } = await tweetApi.get<CommentsResponse>(`tweet/${id}/comments?page=${page}`)
            
            return TweetMapper.mapperComments(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async getTweetsByUser(id: string, page: number, query: string): Promise<Post[] | []> {
        try {

            const { data } = await tweetApi.get<TweetsResponse>(`user/${id}/tweets?page=${page}&filter=${query}`)
            
            return TweetMapper.mapperTweets(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async getTweets(page: number): Promise<Post[] | []> {
        try {

            const { data } = await tweetApi.get<TweetsResponse>(`tweets?page=${page}`)
            
            return TweetMapper.mapperTweets(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async setLike(id: string): Promise<boolean | null> {
        try {

            const { data } = await tweetApi.put<TweetLikedResponse>(`tweet/${id}/like`)
            
            return TweetMapper.mapperTweetLiked(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
        }
    }

    async setLikeComment(id: string): Promise<boolean | null> {
        try {

            const { data } = await tweetApi.put<CommentLikedResponse>(`tweet/${id}/like-comment`)
            
            return TweetMapper.mapperTweetLiked(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
        }
    }

    async setSave(id: string): Promise<boolean | null> {
        try {

            const { data } = await tweetApi.put<TweetSavedResponse>(`tweet/${id}/save`)
            
            return TweetMapper.mapperTweetSaved(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
        }
    }

    async setRetweet(id: string): Promise<boolean | null> {
        try {

            const { data } = await tweetApi.put<TweetRetweetedResponse>(`tweet/${id}/retweet`)
            
            return TweetMapper.mapperTweetRetweeted(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
        }
    }

    async createComment(id: string, dataComment: FormData): Promise<Comment | null> {
        try {

            const { data } = await tweetApi.post<CreateTweetCommentResponse>(`tweet/${id}/comment`, dataComment)
            
            return TweetMapper.mapperComment(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async createTweet(values: FormData): Promise<Post | null> {
        try {

            const { data } = await tweetApi.post<CreatedTweetResponse>(`tweet/`, values)
            
            return TweetMapper.mapperTweet(data.tweet);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    
}