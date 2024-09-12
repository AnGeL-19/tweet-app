import { Connect, UserConnect } from "../domain/entities/connect.entity";

export interface ConnectRepository {
    getConnections(page: number): Promise<UserConnect[] | []>;
    getPeopleWhoWantConnect(page: number): Promise<Connect[] | []>;
}