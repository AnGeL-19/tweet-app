import { Connect, UserConnect, UserConnected } from "../domain/entities/connect.entity";

export interface ConnectRepository {
    getConnections(page: number): Promise<UserConnect[] | []>;
    getPeopleWhoWantConnect(page: number): Promise<Connect[] | []>;
    connectUser(userToId: string): Promise<UserConnected> 
}