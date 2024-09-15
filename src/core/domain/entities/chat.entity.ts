import { User } from "./user.entity";

export interface UserMessage extends Pick<User, 'id' | 'name' | 'profileImage'>{}

export interface Message {
    id: string;
    message: string;
    date: Date;
    user: UserMessage;
}

export interface SendMessage {
    connectId: string;
    user: UserMessage;
    message: string;
    userTo: string;
}