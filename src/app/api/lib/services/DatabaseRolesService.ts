import { DatabaseRole } from "@/app/common/dtos/responses/DatabaseRole";
import { DatabaseRolesRepository } from "../repositories/DatabaseRolesRepository";
import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";

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

    async create(request: RoleCreationRequest) {
        await this.repository.create(request);
    }

    async update(name: string, model: DatabaseRole): Promise<DatabaseRole> {
        return await this.repository.update(name, model);
    }

}