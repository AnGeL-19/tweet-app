import { Trend } from "@/core/domain/entities/trend.entity";
import { User, UserFollow, UserFollowUnfollow, UserRecomment } from "@/core/domain/entities/user.entity";
import { UserRepository } from "@/core/ports/user.repository";
import { TrendsResponse, UserByIDResponse, UserFollowResponse, UserFollowUnfollowResponse, UserRecommentsResponse, UsersResponse } from "../mappers/responses/user.response";
import { tweetApi } from "../http/api";
import { UserMapper } from "../mappers/mapper/user.mapper";
import axios from "axios";
import { CustomError } from "@/core/domain/errors/custom.error";


export class HttpUserRepository implements UserRepository {


    async getUsers(page: number, query: string): Promise<UserRecomment[] | []> {
        try {

            const { data } = await tweetApi.get<UsersResponse>(`user/people?page=${page}${query}`)
            
            return UserMapper.mapperUserRecomments(data);

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

    async getUsersFollow(query: string, id: string): Promise<UserFollow[] | null> {
        try {

            const { data } = await tweetApi.get<UserFollowResponse>(`user/${query}/${id}`)
        
            return UserMapper.mapperUserFllow(data);

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


    async getUserById(id: string): Promise<User | null> {
        try {

            const { data } = await tweetApi.get<UserByIDResponse>(`user/${id}`)
        
            return UserMapper.mapperUser(data);

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

    async setFollowUnfollow(id: string): Promise<UserFollowUnfollow | null > {
        try {

            const { data } = await tweetApi.patch<UserFollowUnfollowResponse>(`user/followUnfollow/${id}`)
        
            return UserMapper.mapperFollowUnfollow(data);

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

    async getTrends(): Promise<Trend[] | []> {
        try {

            const { data } = await tweetApi.get<TrendsResponse>('tweets/trends')
        
        return UserMapper.mapperHashtags(data);

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

    async getUsersRecomented(): Promise<UserRecomment[] | []> {
        try {

            const { data } = await tweetApi.get<UserRecommentsResponse>('user/recomment')
            
            return UserMapper.mapperUserRecomments(data);

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