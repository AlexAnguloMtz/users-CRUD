'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { DatabaseRoleCard } from "./DatabaseRoleCard/DatabaseRoleCard";
import RolePopUpMenu from './DatabaseRoleCard/RolePopUpMenu';
import { useState } from 'react';

export function Cards({ data }: {
    data: Array<DatabaseRole>
}): JSX.Element {

    const [menuAnchor, setMenuAnchor] = useState<null | Element>(null);

    function handleCardClick(e: React.MouseEvent): void {
        setMenuAnchor(e.currentTarget);
    }

    return (
        <div className={styles.cardsContainer}>
            {
                data.map((model: DatabaseRole) =>
                    <DatabaseRoleCard
                        model={model}
                        onClick={handleCardClick}
                    />
                )
            }
            <RolePopUpMenu
                open={Boolean(menuAnchor)}
                anchorElement={menuAnchor}
                onClose={() => setMenuAnchor(null)} />
        </div>
    );
}

