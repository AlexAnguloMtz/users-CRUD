import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { DatabaseRoleCard } from "./DatabaseRoleCard/DatabaseRoleCard";

export function Cards({ data }: {
    data: Array<DatabaseRole>
}): JSX.Element {
    return (
        <div className={styles.cardsContainer}>
            {data.map((model: DatabaseRole) =>
                <DatabaseRoleCard model={model} />)
            }
        </div>
    );
}

