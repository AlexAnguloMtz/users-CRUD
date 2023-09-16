import { Client, QueryResult } from "pg";

export class DatabaseRolesRepository {
    constructor(readonly createDatabaseClient: () => Client) { }

    async count(): Promise<number> {

        const query: string = `
            SELECT COUNT(*)
            FROM (
                SELECT rolname from pg_roles 
                WHERE rolname NOT LIKE 'pg%'
            ) AS database_roles;
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

}