
import { AuthRepository } from '@/core/ports/auth.repository';
import { Auth, Login, Logout } from '../entities/auth.entity';
import { UserRegister } from '../entities/user.entity';


export class AuthService {

    constructor( private authRepository: AuthRepository ) {}

    async login( { email, password }: Login  ): Promise<Auth | null> {

        const result = await this.authRepository.login( email, password)

        return result
    }

    async register( values: UserRegister  ): Promise<Auth | null> {

        const result = await this.authRepository.register(values)

        return result
    }

    async logout(): Promise<Logout | null> {

        const result = await this.authRepository.logout()

        return result
    }

    async checkAuth(): Promise<Auth | null> {

        const result = await this.authRepository.checkAuth()

        return result
    }
}