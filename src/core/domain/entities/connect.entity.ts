import { User, UserFollow } from "./user.entity";


export interface Connect {
    userFrom:    UserFollow;
    userTo:      UserFollow;
    date:        Date;
    isConnected: boolean;
    id:         string;
}

export interface UserConnect extends Pick<User, 'id' | 'name' | 'profileImage' >{
    connectId: string
}

export interface UserConnected {
    connect: StatusConect;
    message: string;
}

export interface StatusConect {
    connectId: string;
    isConnected: boolean;
    isPending: boolean;
}