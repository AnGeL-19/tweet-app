import { ConnectRepository } from "@/core/ports/connect.repository";
import { Connect } from "../entities/connect.entity";


export class ConnectService implements ConnectRepository {

    constructor(private readonly connectService: ConnectRepository){}

    async getConnections(page: number): Promise<Connect[] | null> {
        return this.connectService.getConnections(page)
    }

    getPeopleWhoWantConnect(): Promise<null> {
        throw new Error("Method not implemented.");
    }

}