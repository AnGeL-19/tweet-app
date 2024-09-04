

import React, { useEffect } from 'react'
import { ContextAuth } from './contextAuth'
import { Auth, Login, Logout } from '@/core/domain/entities/auth.entity'
import { useAppDispatch } from '../store/hook'
import { login, logout, updateDataUser } from '@/app/features/auth/authSlice'
import { User, UserRegister } from '@/core/domain/entities/user.entity'
import { authService } from '@/core/domain/services/index.service'

interface Props {
    children: React.ReactNode
}



export const AuthProvider = ({children}: Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        checkAuth()
    }, [])

    const updateUser = (data: User) => {
        dispatch(updateDataUser(data))
    }
    
    const authenticated = ( data: Auth ) => {
        
        dispatch(login(data))

    }

    const deauthenticate = ( data: Logout ) => {
        
        const { message, ...rest } = data

        dispatch(logout(rest))

    }

    const authLogin = async ( data: Login ): Promise<Auth | null> => {
        
        return await authService.login(data)

    }


    const authRegister = async ( data: UserRegister ): Promise<Auth | null> => {
        
        return await authService.register(data)

    }

    const checkAuth = async () => {
       
        const response = await authService.checkAuth();

        if (response) {
            dispatch(login(response))
        }else{
            deauthenticate({
                logged: false,
                message: '',
                token: '',
                user: null
            })
        }

    }

    const authLogout = async (): Promise<Logout | null> => {
        return await authService.logout()
    }

  return (
    <ContextAuth.Provider
        value={{
            authLogin,
            authLogout,
            authenticated,
            deauthenticate,
            authRegister,
            updateUser
        }}
    >
        { children }
    </ContextAuth.Provider>
  )
}
