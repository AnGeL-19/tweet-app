
export interface User{
    id: string;
    name: string;
    email: string;
    bio: string;
    backGroundImage: string;
    profileImage: string;
    numFollowers: number;
    numFollowing: number;
}

export interface UserAvatar extends Pick<User, 'id' | 'name' | 'profileImage' > {}

export interface UserRegister extends Pick<User, 'name' | 'email'>{
    password: string
}

export interface UserRecomment extends Omit<User, 'email' | 'numFollowing'> {}

export interface UserFollowUnfollow {
    ok:  boolean;
    message: string;
    isFollow: boolean;
}

export interface UserFollow extends Omit<User, 'email' | 'backGroundImage' | 'numFollowing' >{
    isFollowing: boolean;
}