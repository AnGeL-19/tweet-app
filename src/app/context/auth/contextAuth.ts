
import { Auth, Login, Logout } from "@/core/domain/entities/auth.entity";
import { UserRegister } from "@/core/domain/entities/user.entity";
import { createContext } from "react";

export interface AuthContext {
    authLogin: (data:Login) => Promise<Auth | null>;
    authLogout: () => Promise<Logout | null>;
    authenticated: (data: Auth) => void;
    deauthenticate: (data: Logout) => void;
    authRegister: (data: UserRegister) =>  Promise<Auth | null>;
}


export const INITAL_VALUES: AuthContext = {
    authLogin: async () => await null,
    authLogout: async () => await null,
    authenticated: () => {},
    deauthenticate: () => {},
    authRegister: async () => await null,
}


export const ContextAuth = createContext(INITAL_VALUES)