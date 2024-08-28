

export interface TweetsResponse {
    ok:     boolean;
    length: number;
    data:   TweetResponse[];
}

export interface TweetResponse {
    tid:           string;
    date:          Date;
    description:   string;
    hashtagsTweet: string[];
    showEveryone:  boolean;
    showFollow:    boolean;
    nRetweets:     number;
    retweets:      any[];
    nSaved:        number;
    saved:         any[];
    nLikes:        number;
    likes:         any[];
    nComentPeople: number;
    userTweet:     UserTweetResponse;
    comentPeople:  any[];
    userRetweet: string | null
}


export interface UserTweetResponse {
    uid:       string;
    name:      string;
    imgUser:   string;
}

export interface CreatedTweetResponse {
    ok:    boolean;
    msg:   string;
    tweet: TweetResponse;
}


