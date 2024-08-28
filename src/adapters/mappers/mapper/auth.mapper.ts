import { Auth, Logout } from "@/core/domain/entities/auth.entity";
import { AuthResponse, LogoutResponse } from "../responses/auth.response";


export class AuthMapper {

    static mapperAuth( response: AuthResponse ): Auth {

        const { ok, data , token  } = response;

        return {
            logged: ok,
            user: {
                id: data.uid,
                name: data.name,
                email: data.email,
                bio: data.bio,
                profileImage: data.imgUser,
                backGroundImage: data.imgUserBackground,
                numFollowers: data.nfollowers,
                numFollowing: data.nfollowing
            },
            token
        }

    }

    static mapperAuthLogout( response: LogoutResponse ): Logout {

    
        return {
            logged: !response.ok,
            user: null,
            token: '',
            message: response.msg
        }

    }


}