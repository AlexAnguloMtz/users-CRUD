import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";
import { DatabaseTablesRepository } from "../repositories/DatabaseTablesRepository";

export class DatabaseTablesService {

    constructor(readonly repository: DatabaseTablesRepository) { }

    async findAll(): Promise<Array<DatabaseTable>> {
        return this.repository.findAll();
    }

}