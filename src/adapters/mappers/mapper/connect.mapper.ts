import { Connect } from "@/core/domain/entities/connect.entity";
import { UserConnectResponse } from "../responses/connect.response";

export class ConnectMapper {


    static mapperUserConnect(response: UserConnectResponse): Connect[] | null {
        
        const { data } = response

        return data.map(( cn ) => ({
            id: cn.cid,
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