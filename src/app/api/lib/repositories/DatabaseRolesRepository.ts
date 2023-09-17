import { DatabaseRole } from "@/app/common/dtos/responses/DatabaseRole";
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

    async findAll(): Promise<Array<DatabaseRole>> {

        const query: string = `
            SELECT rolname, rolsuper, rolcreaterole, rolcreatedb, rolcanlogin
            FROM pg_roles
            WHERE rolname NOT LIKE 'pg_%'
        `;

        const models: Array<DatabaseRole> = [];
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            result.rows.forEach((row) => models.push(this.toModel(row)));
            return models;
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        throw new Error('Could not query roles');
    }

    async findByName(name: string): Promise<DatabaseRole> {
        const query: string = `
            SELECT rolname, rolsuper, rolcreaterole, rolcreatedb, rolcanlogin
            FROM pg_roles
            WHERE rolname = '${name}'
    `;

        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            return this.toModel(result.rows[0]);
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        throw new Error('Could not query roles');
    }

    async update(name: string, model: DatabaseRole): Promise<DatabaseRole> {
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            await this.updateRoleCreationPrivilege(name, model, client);
            await this.updateDatabaseCreationPrivilege(name, model, client);
            await this.updateLoginPrivilege(name, model, client);
            return model;
        } catch (e) {
            console.log(e);
        } finally {
            await client.end();
        }
        throw new Error('Could not update model');
    }

    async updateRoleCreationPrivilege(name: string, model: DatabaseRole, client: Client) {
        const query: string = `ALTER ROLE ${name} WITH ${model.canCreateRole ? 'CREATEROLE' : 'NOCREATEROLE'}`;
        await client.query(query);
    }

    async updateDatabaseCreationPrivilege(name: string, model: DatabaseRole, client: Client) {
        const query: string = `ALTER ROLE ${name} WITH ${model.canCreateDatabase ? 'CREATEDB' : 'NOCREATEDB'}`;
        await client.query(query);
    }

    async updateLoginPrivilege(name: string, model: DatabaseRole, client: Client) {
        const query: string = `ALTER ROLE ${name} ${model.canLogin ? 'LOGIN' : 'NOLOGIN'}`
        await client.query(query);
    }

    private toModel(row: any): DatabaseRole {
        return {
            name: row.rolname,
            isSuperUser: row.rolsuper,
            canCreateRole: row.rolcreaterole,
            canCreateDatabase: row.rolcreatedb,
            canLogin: row.rolcanlogin
        };
    }

}