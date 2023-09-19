import { DatabaseRole } from "@/app/common/dtos/responses/DatabaseRole";

export async function fetchRole(name: string): Promise<DatabaseRole> {
    return fetch(`/api/roles?rolname=${name}`)
        .then(async (response: Response) => {
            return await response.json();
        });
}

export async function updateRole(model: DatabaseRole): Promise<DatabaseRole> {
    return fetch(`/api/roles?rolname=${model.name}`, {
        method: 'PUT',
        body: JSON.stringify(model),
    })
        .then(async (response: Response) => {
            return await response.json();
        });
}

export async function deleteRole(model: DatabaseRole): Promise<DatabaseRole> {
    return fetch(`/api/roles?rolname=${model.name}`, {
        method: 'DELETE',
        body: JSON.stringify(model),
    })
        .then(async (response: Response) => {
            return await response.json();
        });
}