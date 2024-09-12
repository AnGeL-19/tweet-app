import { ChatRepository } from "@/core/ports/chat.repository"
import { Message } from "../entities/chat.entity";




export class ChatService implements ChatRepository {

    constructor(private readonly chatRepository: ChatRepository){}

    async getMessages(page: number, connectId: string): Promise<Message[] | []> {
        return this.chatRepository.getMessages(page, connectId)
    }
    
    sendMessage(data: Message): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }



}