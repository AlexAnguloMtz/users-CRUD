import { DatabaseRole } from "../../common/dtos/responses/DatabaseRole";

export async function fetchData(): Promise<Array<DatabaseRole>> {
    return [
        {
            name: 'hello guys'
        }
    ];
}