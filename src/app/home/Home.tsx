'use client';

import styles from './styles.module.css';
import { DashboardData } from '@/app/common/dtos/responses/DashboardData';
import { Nav } from '@/app/client/components/Nav/Nav';
import { Cards } from './Cards';
import { fetchDashboardData } from './lib/data-fetching';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';

type Result = undefined | Error | DashboardData

export default function Home(): JSX.Element {

    const [result, setResult] = useState<Result>(undefined);

    useEffect(() => {
        if (result === undefined) {
            fetchDashboardData()
                .then(handleData)
                .catch(handleError);
        }
    }, [result]);

    function handleData(data: DashboardData): void {
        setResult(() => data);
    }

    function handleError(error: Error): void {
        setResult(() => error);
    }

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                {<Body result={result} />}
            </main>
        </div>
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
    return <Cards data={result} />;
}

