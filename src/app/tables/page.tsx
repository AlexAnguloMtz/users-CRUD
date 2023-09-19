'use client';

import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import { DatabaseTableCard } from './DatabaseTableCard/DatabaseTableCard';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';
import { fetchTables } from './lib/fetchTables';
import PageTemplate from '../client/components/PageTemplate/page';

type Result = undefined | Error | Array<DatabaseTable>

export default function Tables(): JSX.Element {

    const [result, setResult] = useState<Result>(undefined);

    useEffect(() => {
        if (result === undefined) {
            fetchTables()
                .then((data: Array<DatabaseTable>) => setResult(() => data))
                .catch((error: Error) => setResult(() => error));
        }
    }, [result]);

    return (
        <PageTemplate>
            <main className={styles.page}>
                <Body result={result} />
            </main>
        </PageTemplate>
    );
}

function Body({ result }: {
    result: Result
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
                    <DatabaseTableCard
                        key={table.name}
                        table={table} />)}
            </div>
        </>
    );
}