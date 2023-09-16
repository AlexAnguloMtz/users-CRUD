'use client';

import error from '../../../public/error.png';
import styles from './styles.module.css';
import { DashboardData } from '@/app/common/dtos/responses/DashboardData';
import { Nav } from '@/app/client/components/Nav/Nav';
import { Cards } from './Cards';
import { fetchTablesCount, fetchUsersCount } from './lib/data-fetching';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import Image from 'next/image';

export default function Home(): JSX.Element {

    const [result, setResult] = useState<undefined | DashboardData | Error>(undefined);

    useEffect(() => {
        if (result === undefined) {
            fetchData()
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

    function body(): JSX.Element {
        if (result === undefined) {
            return <LoadingIndicator />
        }
        if (result instanceof Error) {
            return <ErrorScreen />
        }
        return <Cards data={result} />;
    }

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                {
                    body()
                }
            </main>
        </div>
    );
}

async function fetchData(): Promise<DashboardData> {
    throw new Error();
    return {
        usersCount: await fetchUsersCount(),
        tablesCount: await fetchTablesCount(),
    }
}

function ErrorScreen(): JSX.Element {
    return (
        <div className={styles.errorScreen}>
            <h1 className={styles.errorScreenTitle}>Ocurrió un error</h1>
            <Image src={error} alt='error inesperado' />
            <p>No se pudo cargar los datos, intente de nuevo más tarde</p>
        </div>
    );
}