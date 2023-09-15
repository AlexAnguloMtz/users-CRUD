import { Client } from 'pg';

export default function createDatabaseClient(): Client {
    return new Client({
        host: 'localhost',
        port: 5432,
        database: 'users-CRUD',
        user: 'database-admin',
        password: 'secret',
    });
}