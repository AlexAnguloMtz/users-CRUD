'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { PageBody } from './PageBody';
import { FloatingButton } from './FloatingButton/FloatingButton';
import SearchBar from '../client/components/SearchBar';

export function Cards({
    data,
    onSearch,
    search,
    onSearchChanged
}: {
    data: Array<DatabaseRole>,
    onSearch: () => void,
    onSearchChanged: (search: string) => void
    search: string,
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Usuarios</h1>
            <p className={styles.instructions}>Seleccione un usuario para ver y editar sus permisos</p>
            <SearchBar
                onSearch={onSearch}
                value={search}
                onChange={onSearchChanged} />
            <p className={styles.amount}>{data.length} resultados</p>
            <PageBody
                data={data} />
            <FloatingButton />
        </>
    );
}
