import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { DatabaseRoleCard } from "./DatabaseRoleCard/DatabaseRoleCard";

export function Cards({ data }: {
    data: Array<DatabaseRole>
}): JSX.Element {
    return (
        <>
            {data.map((model: DatabaseRole) =>
                <DatabaseRoleCard model={model} />)
            }
        </>
    );
}

