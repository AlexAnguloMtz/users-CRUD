import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";
import { Client } from "pg";

export class DatabaseTablesRepository {

    constructor(readonly client: Client) { }

    async findAll(): Promise<Array<DatabaseTable>> {
        throw new Error("Method not implemented.");
    }

}