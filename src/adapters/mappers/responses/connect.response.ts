import { UserFollowResponse } from "./user.response";

export interface UserConnectResponse {
    ok:     boolean;
    length: number;
    data:   ConnectResponse[];
}

export interface ConnectResponse {
    userFrom:    UserFollowResponse;
    userTo:      UserFollowResponse;
    date:        Date;
    isConnected: boolean;
    cid:         string;
}
