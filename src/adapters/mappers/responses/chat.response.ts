

export interface MessagesResponses {
    ok:     boolean;
    length: number;
    data:   MessageResponse[];
}

export interface MessageResponse {
    cid: string;
    message: string;
    date: Date;
    user: UserMessageResponse
}

export interface UserMessageResponse {
    _id:     string;
    name:    string;
    imgUser: string;
}