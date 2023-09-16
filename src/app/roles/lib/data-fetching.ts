import { DatabaseRole } from "../../common/dtos/responses/DatabaseRole";

export async function fetchData(): Promise<Array<DatabaseRole>> {
    return fetch('/api/roles', { cache: 'no-store' })
        .then(async (response: Response) => {
            return await response.json();
        });
}