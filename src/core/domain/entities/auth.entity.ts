import { User } from "./user.entity";

export interface Auth {

    logged: boolean;
    user: User | null;
    token: string;

}

export interface Login {
    email: string;
    password: string;
}

export interface Logout extends Auth {
    message: string;
}