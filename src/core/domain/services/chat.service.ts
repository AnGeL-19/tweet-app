import { ChatRepository } from "@/core/ports/chat.repository"
import { Message, SendMessage } from "../entities/chat.entity";




export class ChatService implements ChatRepository {

    constructor(private readonly chatRepository: ChatRepository){}

    async getMessages(page: number, connectId: string): Promise<Message[] | []> {
        return this.chatRepository.getMessages(page, connectId)
    }
    
    async sendMessage(data: SendMessage): Promise<void> {
        this.chatRepository.sendMessage(data)
    }



}