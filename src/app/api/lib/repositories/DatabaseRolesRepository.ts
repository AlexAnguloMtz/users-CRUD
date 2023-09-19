import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";
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
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not count rows');
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
            const row = result.rows[0];
            return this.toModel(row, await this.findTablePrivileges(row.rolname, client));
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error(`Could not find role with name ${name}`);
    }

    async create(request: RoleCreationRequest): Promise<void> {

        const client: Client = this.createDatabaseClient();

        const roleCreationQuery = `
            CREATE ROLE ${request.name} WITH
            PASSWORD '${request.password}'
            ${(request.canCreateDb) ? 'CREATEDB' : 'NOCREATEDB'}
            ${(request.canCreateRole) ? 'CREATEROLE' : 'NOCREATEROLE'}
            ${(request.canLogin) ? 'LOGIN' : 'NOLOGIN'}
        `;

        try {
            await client.connect();
            await client.query(roleCreationQuery);
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not create role');
    }

    async update(name: string, model: DatabaseRole): Promise<DatabaseRole> {
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            await this.updateBasicPrivileges(name, model, client);
            return model;
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not update model');
    }

    async existsByName(name: string): Promise<boolean> {
        const client: Client = this.createDatabaseClient();
        const query = `SELECT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${name}')`;
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            return result.rows[0].exists;
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not check if role exists');
    }

    async search(search: string): Promise<Array<DatabaseRole>> {

        const query: string = `
            SELECT rolname, rolsuper, rolcreaterole, rolcreatedb, rolcanlogin
            FROM pg_roles
            WHERE rolname ILIKE '%${search}%' AND rolname NOT LIKE 'pg_%'
        `;

        const models: Array<DatabaseRole> = [];
        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            const result: QueryResult = await client.query(query);
            for (const row of result.rows) {
                const tablesPrivileges: Array<TablePrivileges> = await this.findTablePrivileges(row.rolname, client);
                models.push(this.toModel(row, tablesPrivileges));
            }
            return models;
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not query roles');
    }

    async deleteByName(rolname: string): Promise<void> {

        const query: string = `
            DROP ROLE ${rolname}
        `;

        const client: Client = this.createDatabaseClient();
        try {
            await client.connect();
            await client.query(query);
            return;
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error(`Could not delete role with rolname = ${rolname}`);
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
            for (const row of result.rows) {
                const tablesPrivileges: Array<TablePrivileges> = await this.findTablePrivileges(row.rolname, client);
                models.push(this.toModel(row, tablesPrivileges));
            }
            return models;
        } catch (e) {
            console.log(e);
            console.log((e as Error).message);
            console.log((e as Error).stack);
        } finally {
            await client.end();
        }
        throw new Error('Could not query roles.');
    }

    private async findTablePrivileges(rolname: string, client: Client): Promise<Array<TablePrivileges>> {

        const query: string = `
            SELECT table_name,
            privilege_type
            FROM information_schema.table_privileges
            WHERE grantee = '${rolname}' AND table_schema = 'public';
        `;

        const tablesPrivileges: Array<TablePrivileges> = [];

        const result: QueryResult = await client.query(query);

        for (const row of result.rows) {
            const existingTable = tablesPrivileges.find((t) => t.tableName === row.table_name);
            if (existingTable) {
                existingTable.privileges.push(row.privilege_type);
            } else {
                tablesPrivileges.push({
                    tableName: row.table_name,
                    privileges: [row.privilege_type],
                });
            }
        }

        return tablesPrivileges;
    }

    async updateBasicPrivileges(name: string, model: DatabaseRole, client: Client): Promise<void> {
        await this.updateRoleCreationPrivilege(name, model, client);
        await this.updateDatabaseCreationPrivilege(name, model, client);
        await this.updateLoginPrivilege(name, model, client);
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

    private toModel(row: any, privileges: Array<TablePrivileges>): DatabaseRole {
        return {
            name: row.rolname,
            isSuperUser: row.rolsuper,
            canCreateRole: row.rolcreaterole,
            canCreateDatabase: row.rolcreatedb,
            canLogin: row.rolcanlogin,
            tablesPrivileges: privileges,
        };
    }

}