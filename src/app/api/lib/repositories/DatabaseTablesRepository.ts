import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";
import { Client, QueryResult } from "pg";

export class DatabaseTablesRepository {

    constructor(readonly createDatabaseClient: () => Client) { }

    async findAll(): Promise<Array<DatabaseTable>> {
        const query: string = `
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
            AND table_type='BASE TABLE'
            ORDER BY table_name ASC
        `;

        let models: Array<DatabaseTable> = [];
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            result.rows.forEach((row) => models.push({ name: row.table_name, count: 0 }));
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        return models;
    }

    async count(): Promise<number> {
        const query: string = `
            SELECT COUNT(*)
            FROM (
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema='public'
                AND table_type='BASE TABLE'
            ) AS public_tables;
        `;

        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            return result.rows[0].count;
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        throw new Error('Could not count tables');
    }

    publicTablesQuery(): string {
        return `
            
        `;
    }

}