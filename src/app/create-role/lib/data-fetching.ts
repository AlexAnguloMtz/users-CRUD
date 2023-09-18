import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";

export async function createRole(request: RoleCreationRequest): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}