import { Auth, Logout } from '../domain/entities/auth.entity';
import { UserRegister } from '../domain/entities/user.entity';

export interface AuthRepository {
    login(email:string, password:string): Promise<Auth | null>;
    logout(): Promise<Logout | null>;
    checkAuth(): Promise<Auth | null>;
    register(data: UserRegister):  Promise<Auth | null>;
}