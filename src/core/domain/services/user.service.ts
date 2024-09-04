import { UserRepository } from "@/core/ports/user.repository";
import { Trend } from "../entities/trend.entity";
import { ChangeImage, UpdateUser, User, UserFollow, UserFollowUnfollow, UserRecomment } from "../entities/user.entity";




export class UserService implements UserRepository {

    constructor(private userRepository: UserRepository ) {}

    async updateUser(data: UpdateUser): Promise<User | null> {
        return await this.userRepository.updateUser(data);
    }

    async updateImage(query: string, image: FormData): Promise<ChangeImage | null> {
        return await this.userRepository.updateImage(query, image)
    }

    async getUsers(page: number, query: string): Promise<UserRecomment[] | []> {
        return await this.userRepository.getUsers(page, query);
    }

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