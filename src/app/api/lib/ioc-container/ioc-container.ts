import { DatabaseTablesRepository } from "../repositories/DatabaseTablesRepository";
import { DatabaseTablesService } from "../services/DatabaseTableService";
import databaseClient from '../database/database';

const tablesRepository: DatabaseTablesRepository = new DatabaseTablesRepository(databaseClient);

export const tablesService: DatabaseTablesService = new DatabaseTablesService(tablesRepository);
