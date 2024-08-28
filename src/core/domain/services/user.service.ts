import { UserRepository } from "@/core/ports/user.repository";
import { Trend } from "../entities/trend.entity";
import { User, UserFollow, UserFollowUnfollow, UserRecomment } from "../entities/user.entity";




export class UserService implements UserRepository {

    constructor(private userRepository: UserRepository ) {}

    async getUsersFollow(query: string, id: string): Promise<UserFollow[] | null> {
        return await this.userRepository.getUsersFollow(query,id) 
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.getUserById(id) 
    }

    async setFollowUnfollow(id:string): Promise<UserFollowUnfollow | null> {
        return await this.userRepository.setFollowUnfollow(id)
    }

    async getTrends(): Promise<Trend[] | []> {

        return await this.userRepository.getTrends()
        
    }

    async getUsersRecomented(): Promise<UserRecomment[] | []> {
        return await this.userRepository.getUsersRecomented()
    }


}