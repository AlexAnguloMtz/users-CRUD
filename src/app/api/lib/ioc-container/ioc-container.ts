import { DatabaseTablesRepository } from "../repositories/DatabaseTablesRepository";
import { DatabaseTablesService } from "../services/DatabaseTableService";
import createDatabaseClient from '../database/database';
import { DatabaseRolesRepository } from "../repositories/DatabaseRolesRepository";
import { DatabaseRolesService } from "../services/DatabaseRolesService";

const tablesRepository: DatabaseTablesRepository = new DatabaseTablesRepository(createDatabaseClient);

const rolesRepository: DatabaseRolesRepository = new DatabaseRolesRepository(createDatabaseClient);

export const tablesService: DatabaseTablesService = new DatabaseTablesService(tablesRepository);

export const rolesService: DatabaseRolesService = new DatabaseRolesService(rolesRepository);