import { CustomError } from "@/core/domain/errors/custom.error";
import { ConnectRepository } from "@/core/ports/connect.repository";
import axios from "axios";
import { UserConnectResponse } from "../mappers/responses/connect.response";
import { tweetApi } from "../http/api";
import { ConnectMapper } from "../mappers/mapper/connect.mapper";
import { Connect } from "@/core/domain/entities/connect.entity";

export class HttpConnectRepository implements ConnectRepository {

    async getConnections(page: number): Promise<Connect[] | null> {
        try {

            const { data } = await tweetApi.get<UserConnectResponse>(`connect/`)
            
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

    async getPeopleWhoWantConnect(): Promise<null> {
        throw new Error("Method not implemented.");
    }

}
