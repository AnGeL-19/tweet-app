import { Connect, UserConnect, UserConnected } from "@/core/domain/entities/connect.entity";
import { ConnectUserResponse, UserRecommendConnectResponse, UsersConnectResponse } from "../responses/connect.response";

export class ConnectMapper {

    static mapperConnect(response: ConnectUserResponse): UserConnected {

        const { message, connect } = response;

        return {
            message,
            connect: {
                connectId: connect.connectId,
                isConnected: connect.isConnected,
                isPending: connect.isPending
            }
        }

    }

    static mapperUserConnect(response: UsersConnectResponse): UserConnect[] | [] {

        const { data } = response;

        return data.map( (user) => ({
            id: user._id,
            name: user.name,
            profileImage: user.imgUser,
            connectId: user.connectId
        }))

    }

    static mapperUserRecommendConnect(response: UserRecommendConnectResponse): Connect[] | [] {
        
        const { data } = response

        return data.map(( cn ) => ({
            id: cn._id,
            date: cn.date,
            isConnected: cn.isConnected,
            userFrom: {
                id: cn.userFrom.uid,
                bio: cn.userFrom.bio,
                isFollowing: cn.userFrom.isFollowing,
                name: cn.userFrom.name,
                numFollowers: cn.userFrom.nfollowers,
                profileImage: cn.userFrom.imgUser
            },
            userTo: {
                id: cn.userTo.uid,
                bio: cn.userTo.bio,
                isFollowing: cn.userTo.isFollowing,
                name: cn.userTo.name,
                numFollowers: cn.userTo.nfollowers,
                profileImage: cn.userTo.imgUser
            },
        }) )
    }

}