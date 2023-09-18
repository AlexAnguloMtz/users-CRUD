'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { PageBody } from './PageBody';
import { FloatingButton } from './FloatingButton/FloatingButton';

export function Cards({
    data,
}: {
    data: Array<DatabaseRole>,
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Usuarios</h1>
            <p className={styles.instructions}>Seleccione un usuario para ver y editar sus permisos</p>
            <PageBody
                data={data} />
            <FloatingButton />
        </>
    );
}
