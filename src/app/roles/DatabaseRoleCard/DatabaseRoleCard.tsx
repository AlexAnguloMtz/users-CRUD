'use client';

import { DatabaseRole } from '@/app/common/dtos/responses/DatabaseRole';
import styles from './styles.module.css';

export function DatabaseRoleCard({ model }: {
    model: DatabaseRole
}): JSX.Element {
    return (
        <article className={styles.card}>
            {model.name}
        </article>
    );
}