import { Message } from "@/core/domain/entities/chat.entity";
import { CustomError } from "@/core/domain/errors/custom.error";
import { ChatRepository } from "@/core/ports/chat.repository";
import axios from "axios";
import { tweetApi } from "../http/api";
import { MessagesResponses } from "../mappers/responses/chat.response";
import { ChatMapper } from "../mappers/mapper/chat.mapper";


export class HttpChatRepository implements ChatRepository {

    async getMessages(page: number, connectId: string): Promise<Message[] | []> {
        try {

            const { data } = await tweetApi.get<MessagesResponses>(`chat/messages/${connectId}?page=${page}`)
            
            return ChatMapper.messagesMapper(data);

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

    async sendMessage(data: Message): Promise<Message | null> {
        try {

            // const { data } = await tweetApi.get<UsersConnectResponse>(`connect/`)
            
            return null

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