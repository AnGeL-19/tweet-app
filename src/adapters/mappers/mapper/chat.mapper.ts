import { Message } from "@/core/domain/entities/chat.entity";
import { MessagesResponses } from "../responses/chat.response";


export class ChatMapper {

    static messagesMapper(reponses: MessagesResponses): Message[] | [] {
        
        const { data } = reponses

        return data.map( (message) => ({
            id: message.cid,
            date: message.date,
            message: message.message,
            user: {
                id: message.user._id,
                name: message.user.name,
                profileImage: message.user.imgUser
            }
        }))
    }

}