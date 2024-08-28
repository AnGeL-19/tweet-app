import axios from "axios";

// 'https://app-tweet-backend.vercel.app/api/'

export const tweetApi = axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true
})
  