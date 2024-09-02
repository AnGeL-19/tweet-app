

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
    imgTweet:      string;
    showEveryone:  boolean;
    showFollow:    boolean;
    nRetweets:     number;
    retweeted:      boolean;
    nSaved:        number;
    saved:         boolean;
    nLikes:        number;
    liked:         boolean;
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


export interface TweetLikedResponse {
    ok:      boolean;
    msg:     string;
    isLiked: boolean;
}

export interface CommentLikedResponse extends TweetLikedResponse {}

export interface TweetRetweetedResponse {
    ok:      boolean;
    msg:     string;
    isRetweeted: boolean;
}

export interface TweetSavedResponse {
    ok:      boolean;
    msg:     string;
    isSaved: boolean;
}


export interface CreateTweetCommentResponse {
    ok:      boolean;
    comment: CommentResponse;
}

export interface CommentResponse {
    cid:          string;
    userComment:  UserTweetResponse;
    tweetComment: string;
    commentText:  string;
    imgComment:   string;
    nLikes:       number;
    likes:        any[];
    date:         Date;
    liked:        boolean;
}

export interface CommentsResponse {
    ok:       boolean;
    comments: CommentResponse[];
}



