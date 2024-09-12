import { Message } from "../domain/entities/chat.entity";


export interface ChatRepository {
    getMessages(page: number, connectId: string): Promise<Message[] | []>;
    sendMessage(data: Message): Promise<Message | null>;
}