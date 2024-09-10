import { Connect } from "../domain/entities/connect.entity";

export interface ConnectRepository {
    getConnections(page: number): Promise<Connect[] | null>;
    getPeopleWhoWantConnect(): Promise<null>;
}