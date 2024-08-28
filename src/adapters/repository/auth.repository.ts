

import { AuthRepository } from "@/core/ports/auth.repository";
import { tweetApi } from "../http/api";
import { Auth, Logout } from "@/core/domain/entities/auth.entity";
import { AuthResponse, LogoutResponse } from "../mappers/responses/auth.response";
import { AuthMapper } from "../mappers/mapper/auth.mapper";
import axios from "axios";
import { CustomError } from "@/core/domain/errors/custom.error";
import { UserRegister } from "@/core/domain/entities/user.entity";


export class HttpAuthRepository implements AuthRepository {

    async login(email: string, password: string): Promise<Auth | null> {
        try {

            const { data } = await tweetApi.post<AuthResponse>('auth/login', {
                email, 
                password
            },
            )
            
            return AuthMapper.mapperAuth(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async register(values: UserRegister): Promise<Auth | null> {
        try {

            const { data } = await tweetApi.post<AuthResponse>('auth/register', values)
            
            return AuthMapper.mapperAuth(data);

          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }


    async checkAuth(): Promise<Auth | null> {
        try {

            const { data } = await tweetApi.get<AuthResponse>('auth/check-auth', { 
                withCredentials: true, // Enviar cookies con la solicitud
              })

            return AuthMapper.mapperAuth(data);

          } catch (error) {
            console.log(error);
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    async logout(): Promise<Logout | null> {
        try {

            const { data } = await tweetApi.post<LogoutResponse>('auth/logout',null,{
                withCredentials: true
            })

            return AuthMapper.mapperAuthLogout(data);

          } catch (error) {
            console.log(error);
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new CustomError('Unauthorized: Invalid credentials');
                } else if (error.response?.status === 500) {
                    throw new CustomError('Server error: Please try again later');
                } else {
                    throw new CustomError(`Unexpected error: ${error.message}`, error.response?.data);
                }
            } else {
                throw new CustomError('An unknown error occurred');
            }
          }
    }

    
}
