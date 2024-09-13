import { UserResponse } from "./auth.response";


export interface TrendsResponse {
    ok:   boolean;
    data: TrendResponse[];
}

export interface TrendResponse {
    hid:         string;
    nameHashtag: string;
    tweet:       string;
    nTweets:     number;
}

export interface UserRecommentsResponse {
    ok:   boolean;
    data: UserRecommentResponse[];
}

export interface UsersResponse {
    ok:   boolean;
    length: number;
    data: UserRecommentResponse[];
}

export interface UserRecommentResponse {
    name:              string;
    bio:               string;
    imgUser:           string;
    imgUserBackground: string;
    followers:         any[];
    uid:               string;
}

export interface UserFollowUnfollowResponse {
    ok:  boolean;
    msg: string;
    follow: boolean;
}

export interface UserByIDResponse {
    ok:   boolean;
    data: UserResponse;
    isFollowing: boolean;
    connect: StatusConnectResponse
}

export interface StatusConnectResponse {
    connectId: string;
    isConnected: boolean;
    isPending: boolean;
}

export interface UserFollowsResponse {
    ok:     boolean;
    length: number;
    data:   UserFollowResponse[];
}

export interface UserFollowResponse {
    name:      string;
    bio:       string;
    imgUser:   string;
    nfollowers: number;
    uid:       string;
    isFollowing: boolean;
}

export interface UpdateImageResponse {
    ok:     boolean;
    msg:    string;
    url:    string;
}

export interface UpdateUserResponse {
    ok:     boolean;
    msg:    string;
    data:    UserResponse;
}
