export interface AuthResponse {
    ok:    boolean;
    data:  UserResponse;
    token: string;
}

export interface UserResponse {
    uid:               string;
    name:              string;
    email:             string;
    bio:               string;
    imgUser:           string;
    imgUserBackground: string;
    loginGoogle:       boolean;
    posts:             any[];
    retweets:          any[];
    saved:             any[];
    likes:             any[];
    followers:         any[];
    following:         any[];
    nfollowers:        number;
    nfollowing:        number;
    isFollowing:       boolean;
}

export interface LogoutResponse {
    ok: boolean;
    msg: string;
}
