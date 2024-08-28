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
}

export interface UserFollowResponse {
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



