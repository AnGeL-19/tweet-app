import { Trend } from "../domain/entities/trend.entity";
import { User, UserFollow, UserFollowUnfollow, UserRecomment } from "../domain/entities/user.entity";

export interface UserRepository {

    getUsers(page: number, query: string): Promise<UserRecomment[] | []>;
    getTrends(): Promise< Trend[] | []>;
    getUsersRecomented(): Promise<UserRecomment[] | []>;
    setFollowUnfollow(id: string): Promise<UserFollowUnfollow | null>;
    getUserById(id: string): Promise<User | null>;
    getUsersFollow(query:string, id: string): Promise<UserFollow[] | null>

}