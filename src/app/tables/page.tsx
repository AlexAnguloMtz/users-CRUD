'use client';

import { Nav } from '@/app/client/components/Nav/Nav';
import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import { DatabaseTableCard } from './DatabaseTableCard/DatabaseTableCard';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';

export default function Tables(): JSX.Element {

    const [isShowingError, setShowingError] = useState<boolean>(false);

    const [tables, setTables] = useState<Array<DatabaseTable> | undefined>(undefined);

    useEffect(() => {
        if (tables === undefined) {
            fetchData()
                .then(handleSuccess)
                .catch(handleError);
        }
    }, []);

    function handleSuccess(tables: Array<DatabaseTable>): void {
        setTables(() => tables);
    }

    function handleError(error: Error): void {
        setShowingError(() => true);
    }

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                <h1 className={styles.header}>Tablas</h1>
                <div className={styles.cards}>
                    {
                        (tables === undefined)
                            ? <LoadingIndicator />
                            : tables!.map((table: DatabaseTable) =>
                                <DatabaseTableCard table={table} />)
                    }
                </div>
            </main>
        </div>
    );
}

async function fetchData(): Promise<Array<DatabaseTable>> {
    return fetch('http://localhost:3000/api/tables', { cache: 'no-store' })
        .then(async (response: Response) => {
            return await response.json();
        });
}