import { DatabaseRole } from "@/app/common/dtos/responses/DatabaseRole";
import { DatabaseRolesRepository } from "../repositories/DatabaseRolesRepository";

export class DatabaseRolesService {

    constructor(readonly repository: DatabaseRolesRepository) { }

    async findAll(): Promise<Array<DatabaseRole>> {
        return await this.repository.findAll();
    }

    async count(): Promise<number> {
        return await this.repository.count();
    }

    async findByName(name: string): Promise<DatabaseRole> {
        return this.repository.findByName(name);
    }

    async update(name: string, model: DatabaseRole): Promise<DatabaseRole> {
        return this.repository.update(name, model);
    }

}