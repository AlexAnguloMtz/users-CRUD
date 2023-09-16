import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";
import { DatabaseTablesRepository } from "../repositories/DatabaseTablesRepository";

export class DatabaseTablesService {

    constructor(readonly repository: DatabaseTablesRepository) { }

    async findAll(): Promise<Array<DatabaseTable>> {
        return await this.repository.findAll();
    }

    async count(): Promise<number> {
        return await this.repository.count();
    }

}