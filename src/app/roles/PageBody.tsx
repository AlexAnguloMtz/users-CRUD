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
                data.map((model: DatabaseRole) =>
                    <DatabaseRoleCard
                        key={model.name}
                        model={model} />
                )
            }
        </div>
    );
}

