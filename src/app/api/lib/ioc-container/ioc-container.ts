import { DatabaseTablesRepository } from "../repositories/DatabaseTablesRepository";
import { DatabaseTablesService } from "../services/DatabaseTableService";
import createDatabaseClient from '../database/database';

const tablesRepository: DatabaseTablesRepository = new DatabaseTablesRepository(createDatabaseClient);

export const tablesService: DatabaseTablesService = new DatabaseTablesService(tablesRepository);
