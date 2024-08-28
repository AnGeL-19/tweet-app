import { HttpUserRepository } from "@/adapters/repository/user.repository";
import { UserService } from "./user.service";
import { HttpTweetRepository } from "@/adapters/repository/tweet.repository";
import { TweetService } from "./tweet.service";
import { HttpAuthRepository } from "@/adapters/repository/auth.repository";
import { AuthService } from "./auth.service";


const userRepository = new HttpUserRepository()
export const userService = new UserService(userRepository)

const tweetRepository = new HttpTweetRepository()
export const tweetSservice = new TweetService(tweetRepository)

const authRespository = new HttpAuthRepository()
export const authService = new AuthService(authRespository)