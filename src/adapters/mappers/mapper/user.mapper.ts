import { Trend } from "@/core/domain/entities/trend.entity";
import { TrendsResponse, UserByIDResponse, UserFollowResponse, UserFollowUnfollowResponse, UserRecommentsResponse } from "../responses/user.response";
import { User, UserFollow, UserFollowUnfollow, UserRecomment } from "@/core/domain/entities/user.entity";


export class UserMapper {

    static mapperUserFllow( response: UserFollowResponse ): UserFollow[] {

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

        const { data, isFollowing } = response

        return {
            id: data.uid,
            name: data.name,
            email: data.email,
            bio: data.bio,
            profileImage: data.imgUser,
            backGroundImage: data.imgUserBackground,
            numFollowers: data.nfollowers,
            numFollowing: data.nfollowing,
            isFollowing: isFollowing
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


}