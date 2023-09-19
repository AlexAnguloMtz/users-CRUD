'use client';

import { useEffect, useState } from 'react';
import { DatabaseRole } from '../common/dtos/responses/DatabaseRole';
import styles from './styles.module.css';
import { findRoles } from './lib/data-fetching';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';
import { Cards } from './Cards';
import { PageTemplate } from '../client/components/PageTemplate';

export default function Roles(): JSX.Element {

    const [isLoading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<Array<DatabaseRole>>([]);

    const [error, setError] = useState<Error | undefined>(undefined);

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        if (isLoading) {
            findRoles(search)
                .then(handleData)
                .catch(handleError)
        }
    }, [isLoading, search]);

    function handleData(data: Array<DatabaseRole>): void {
        setLoading(false);
        setData((_) => data);
    }

    function handleError(error: Error): void {
        setLoading(false);
        setError(error);
    }

    function handleSearchEvent(): void {
        setSearch(search);
        setLoading(true);
    }

    function body(): JSX.Element {
        if (isLoading) {
            return <LoadingIndicator />
        }
        if (error !== undefined) {
            return <ErrorScreen />
        }
        return (
            <Cards
                search={search}
                data={data}
                onSearch={handleSearchEvent}
                onSearchChanged={setSearch} />
        );
    }

    return (
        <PageTemplate>
            <main className={styles.body}>
                {body()}
            </main>
        </PageTemplate>
    );
}