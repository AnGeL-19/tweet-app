
import { Auth, Login, Logout } from "@/core/domain/entities/auth.entity";
import { User, UserRegister } from "@/core/domain/entities/user.entity";
import { createContext } from "react";

export interface AuthContext {
    authLogin: (data:Login) => Promise<Auth | null>;
    authLogout: () => Promise<Logout | null>;
    authenticated: (data: Auth) => void;
    deauthenticate: (data: Logout) => void;
    authRegister: (data: UserRegister) =>  Promise<Auth | null>;
    updateUser: (data: User) => void
}


export const INITAL_VALUES: AuthContext = {
    authLogin: async () => await null,
    authLogout: async () => await null,
    authenticated: () => {},
    deauthenticate: () => {},
    authRegister: async () => await null,
    updateUser: () => {}
}


export const ContextAuth = createContext(INITAL_VALUES)