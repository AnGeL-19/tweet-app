import { ConnectRepository } from "@/core/ports/connect.repository";
import { Connect, UserConnect } from "../entities/connect.entity";


export class ConnectService implements ConnectRepository {

    constructor(private readonly connectRepository: ConnectRepository){}

    async getConnections(page: number): Promise<UserConnect[] | []> {
        return this.connectRepository.getConnections(page)
    }

    async getPeopleWhoWantConnect(page: number):Promise<Connect[] | []> {
        return this.connectRepository.getPeopleWhoWantConnect(page)
    }

}