import { DatabaseRole } from "@/app/common/dtos/responses/DatabaseRole";
import { DatabaseRolesRepository } from "../repositories/DatabaseRolesRepository";
import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";
import { ConflictException } from "@/app/common/exceptions/ConflictException";

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
        if (await this.repository.existsByName(request.name)) {
            throw new ConflictException(`Role with name ${request.name} already exists`);
        }
        await this.repository.create(request);
    }

    async update(name: string, model: DatabaseRole): Promise<DatabaseRole> {
        return await this.repository.update(name, model);
    }

}