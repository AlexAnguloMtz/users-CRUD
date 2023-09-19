'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { DatabaseRoleCard } from "./DatabaseRoleCard/DatabaseRoleCard";

export function PageBody({
    data
}: {
    data: Array<DatabaseRole>,
}): JSX.Element {

    return (
        <div className={styles.cardsContainer}>
            {
                sorted(data).map((model: DatabaseRole) =>
                    <DatabaseRoleCard
                        key={model.name}
                        model={model} />
                )
            }
        </div>
    );
}

function sorted(arr: Array<DatabaseRole>): Array<DatabaseRole> {
    return arr.sort((a, b) => {
        if (a.isSuperUser === b.isSuperUser) {
            return a.name.localeCompare(b.name);
        }
        return a.isSuperUser ? -1 : 1;
    });
}