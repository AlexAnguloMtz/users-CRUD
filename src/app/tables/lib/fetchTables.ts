import { DatabaseTable } from "@/app/common/dtos/responses/DatabaseTable";

export async function fetchTables(): Promise<Array<DatabaseTable>> {
    return fetch('/api/tables', { cache: 'no-store' })
        .then(async (response: Response) => {
            return await response.json();
        });
}