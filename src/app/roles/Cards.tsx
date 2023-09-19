'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { PageBody } from './PageBody';
import { FloatingButton } from './FloatingButton/FloatingButton';
import { TextField } from '@mui/material';
import SearchBar from '../client/components/SearchBar';

export function Cards({
    data,
}: {
    data: Array<DatabaseRole>,
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Usuarios</h1>
            <p className={styles.instructions}>Seleccione un usuario para ver y editar sus permisos</p>
            <SearchBar onSearch={() => { }} />
            <p className={styles.amount}>22 resultados</p>
            <PageBody
                data={data} />
            <FloatingButton />
        </>
    );
}
