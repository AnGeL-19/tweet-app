import { UserFollowResponse } from "./user.response";

export interface UserRecommendConnectResponse {
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

export interface UsersConnectResponse {
    ok:     boolean;
    length: number;
    data:   UserConnectResponse[];
}

export interface UserConnectResponse {
    _id:     string;
    name:    string;
    imgUser: string;
    connectId: string;
}
