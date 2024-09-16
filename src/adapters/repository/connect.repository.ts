import { CustomError } from "@/core/domain/errors/custom.error";
import { ConnectRepository } from "@/core/ports/connect.repository";
import axios from "axios";
import { ConnectUserResponse, UserRecommendConnectResponse, UsersConnectResponse } from "../mappers/responses/connect.response";
import { tweetApi } from "../http/api";
import { ConnectMapper } from "../mappers/mapper/connect.mapper";
import { Connect, UserConnect, UserConnected } from "@/core/domain/entities/connect.entity";

export class HttpConnectRepository implements ConnectRepository {

    async connectUser(userToId: string): Promise<UserConnected> {
        try {

            const { data } = await tweetApi.put<ConnectUserResponse>(`connect/user/${userToId}`)
            
            return ConnectMapper.mapperConnect(data);

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

    async getConnections(page: number): Promise<UserConnect[] | []> {
        try {

            const { data } = await tweetApi.get<UsersConnectResponse>(`connect?page=${page}`)
            
            return ConnectMapper.mapperUserConnect(data);

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

    async getPeopleWhoWantConnect(page: number): Promise<Connect[] | []> {
        try {

            const { data } = await tweetApi.get<UserRecommendConnectResponse>(`connect/recommend?page=${page}`)
            
            return ConnectMapper.mapperUserRecommendConnect(data);

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
