import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";
import { Client, QueryResult } from "pg";

export class DatabaseTablesRepository {

    constructor(readonly createDatabaseClient: () => Client) { }

    async findAll(): Promise<Array<DatabaseTable>> {
        const query: string = `SELECT table_name
                               FROM information_schema.tables
                               WHERE table_schema='public'
                               AND table_type='BASE TABLE'`;

        let models: Array<DatabaseTable> = [];
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const response: QueryResult = await client.query(query);
            response.rows.forEach((row) => models.push(this.toModel(row)));
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        return models;
    }

    toModel(row: any): DatabaseTable {
        return {
            name: row.table_name
        }
    }

}