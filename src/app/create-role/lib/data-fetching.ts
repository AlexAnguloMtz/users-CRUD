import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";
import { HttpStatus } from "@/app/common/utils/HttpStatus";

export async function createRole(
    request: RoleCreationRequest,
    onConclict: () => void,
    onError: () => void,
    onSuccess: () => void,
): Promise<void> {
    const response: Response = await fetch('/api/roles', {
        method: 'POST',
        body: JSON.stringify(request)
    });

    if (response.status === HttpStatus.CONFLICT) {
        onConclict();
        return;
    }

    if (response.status < 200 && response.status > 299) {
        onError();
        return;
    }

    onSuccess();
}