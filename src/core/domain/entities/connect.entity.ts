import { UserFollow } from "./user.entity";


export interface Connect {
    userFrom:    UserFollow;
    userTo:      UserFollow;
    date:        Date;
    isConnected: boolean;
    id:         string;
}