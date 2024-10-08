import { HttpUserRepository } from "@/adapters/repository/user.repository";
import { UserService } from "./user.service";
import { HttpTweetRepository } from "@/adapters/repository/tweet.repository";
import { TweetService } from "./tweet.service";
import { HttpAuthRepository } from "@/adapters/repository/auth.repository";
import { AuthService } from "./auth.service";
import { HttpConnectRepository } from "@/adapters/repository/connect.repository";
import { ConnectService } from "./connect.service";
import { HttpChatRepository } from "@/adapters/repository/chat.repository";
import { ChatService } from "./chat.service";


const userRepository = new HttpUserRepository()
export const userService = new UserService(userRepository)

const tweetRepository = new HttpTweetRepository()
export const tweetSservice = new TweetService(tweetRepository)

const authRespository = new HttpAuthRepository()
export const authService = new AuthService(authRespository)

const connectRespository = new HttpConnectRepository()
export const connectService = new ConnectService(connectRespository)

const chatRespository = new HttpChatRepository()
export const chatService = new ChatService(chatRespository)