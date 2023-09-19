import { DatabaseRole } from "../../common/dtos/responses/DatabaseRole";

export async function findRoles(search?: string): Promise<Array<DatabaseRole>> {
    const endpoint: string = `/api/roles${search ? `?search=${search.trim()}` : ''}`
    return fetch(endpoint, { cache: 'no-store' })
        .then(async (response: Response) => {
            return await response.json();
        });
}