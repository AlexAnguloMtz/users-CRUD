'use client';

import { Nav } from '@/app/client/components/Nav/Nav';
import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import { DatabaseTableCard } from './DatabaseTableCard/DatabaseTableCard';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';
import { fetchTables } from './lib/fetchTables';

export default function Tables(): JSX.Element {

    const [result, setResult] = useState<undefined | Array<DatabaseTable> | Error>(undefined);

    useEffect(() => {
        if (result === undefined) {
            fetchTables()
                .then(handleSuccess)
                .catch(handleError);
        }
    }, []);

    function handleSuccess(tables: Array<DatabaseTable>): void {
        setResult(() => tables);
    }

    function handleError(error: Error): void {
        setResult(() => error);
    }

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                <Body result={result} />
            </main>
        </div>
    );
}

function Body({ result }: {
    result: undefined | Error | Array<DatabaseTable>
}): JSX.Element {
    if (result === undefined) {
        return <LoadingIndicator />
    }
    if (result instanceof Error) {
        return <ErrorScreen error={result} />
    }
    return <Cards tables={result} />
}

function Cards({ tables }: {
    tables: Array<DatabaseTable>,
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Tablas</h1>
            <div className={styles.cards}>
                {tables.map((table: DatabaseTable) =>
                    <DatabaseTableCard table={table} />)}
            </div>
        </>
    );
}