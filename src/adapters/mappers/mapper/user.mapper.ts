import { Trend } from "@/core/domain/entities/trend.entity";
import { TrendsResponse, UpdateImageResponse, UpdateUserResponse, UserByIDResponse, UserFollowsResponse, UserFollowUnfollowResponse, UserRecommentsResponse } from "../responses/user.response";
import { ChangeImage, User, UserFollow, UserFollowUnfollow, UserRecomment } from "@/core/domain/entities/user.entity";


export class UserMapper {

    static mapperUserFllow( response: UserFollowsResponse ): UserFollow[] {

        const { data } = response

        return data.map((user) => ({
            id: user.uid,
            name: user.name,
            bio: user.bio,
            profileImage: user.imgUser,
            numFollowers: user.nfollowers,
            isFollowing: user.isFollowing
        }))

    }


    static mapperUser( response: UserByIDResponse ): User {

        const { data, isFollowing, connect } = response

        return {
            id: data.uid,
            name: data.name,
            email: data.email,
            bio: data.bio,
            profileImage: data.imgUser,
            backGroundImage: data.imgUserBackground,
            numFollowers: data.nfollowers,
            numFollowing: data.nfollowing,
            isFollowing: isFollowing,
            connect: {
                connectId: connect.connectId,
                isConnected: connect.isConnected,
                isPending: connect.isPending
            }
        }

    }

    static mapperUserUpdated( response: UpdateUserResponse ): User {

        const { data } = response

        return {
            id: data.uid,
            name: data.name,
            email: data.email,
            bio: data.bio,
            profileImage: data.imgUser,
            backGroundImage: data.imgUserBackground,
            numFollowers: data.nfollowers,
            numFollowing: data.nfollowing
        }

    }

    static mapperFollowUnfollow( response: UserFollowUnfollowResponse ): UserFollowUnfollow {

        return {
            ok: response.ok,
            message: response.msg,
            isFollow: response.follow
        }

    }

    static mapperHashtags( response: TrendsResponse ): Trend[] {

        const { data  } = response;

        return data.map((hashtag) => ({
            id: hashtag.hid,
            name: hashtag.nameHashtag,
            numTweets: hashtag.nTweets
        }))

    }

    static mapperUserRecomments( response: UserRecommentsResponse ): UserRecomment[] {

        const { data  } = response;

        return data.map((user) => ({
            id: user.uid,
            name: user.name,
            bio: user.bio,
            backGroundImage: user.imgUserBackground,
            profileImage: user.imgUser,
            numFollowers: user.followers.length
        }))

    }

    static mapperUpdateImage( response: UpdateImageResponse ): ChangeImage | null {
        return {
            ok: response.ok,
            message: response.msg,
            url: response.url
        }
    }


}