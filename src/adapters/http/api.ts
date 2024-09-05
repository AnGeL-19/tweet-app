import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// 'https://app-tweet-backend.vercel.app/api/'

export const tweetApi = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})
  