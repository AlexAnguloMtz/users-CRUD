import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";

export async function createRole(request: RoleCreationRequest): Promise<void> {
    await fetch('/api/roles', {
        method: 'POST',
        body: JSON.stringify(request)
    });
}