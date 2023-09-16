'use client';

import { useEffect, useState } from 'react';
import { Nav } from '../client/components/Nav/Nav';
import { DatabaseRole } from '../common/dtos/responses/DatabaseRole';
import styles from './styles.module.css';
import { fetchData } from './lib/data-fetching';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';
import { DatabaseRoleCard } from './DatabaseRoleCard/DatabaseRoleCard';

type Result = undefined | Error | Array<DatabaseRole>

export default function Roles(): JSX.Element {

    const [result, setResult] = useState<Result>(undefined);

    useEffect(() => {
        if (result === undefined) {
            fetchData()
                .then(setResult)
                .catch(setResult)
        }
    }, [result]);

    return (
        <div>
            <Nav />
            <main className={styles.body}>
                <Body result={result} />
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
    return <Cards data={result} />
}

function Cards({ data }: {
    data: Array<DatabaseRole>
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Usuarios</h1>
            <p className={styles.instructions}>Seleccione un usuario para ver y editar su información</p>
            {
                data.map((model: DatabaseRole) =>
                    <DatabaseRoleCard model={model} />)
            }
        </>
    );
}
