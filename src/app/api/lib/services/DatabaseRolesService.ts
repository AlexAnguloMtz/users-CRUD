import { DatabaseRolesRepository } from "../repositories/DatabaseRolesRepository";

export class DatabaseRolesService {
    constructor(readonly repository: DatabaseRolesRepository) { }

    async count(): Promise<number> {
        return await this.repository.count();
    }
}