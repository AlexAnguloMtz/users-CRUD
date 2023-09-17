'use client';

import { useEffect, useState } from 'react';
import { Nav } from '../client/components/Nav/Nav';
import { DatabaseRole } from '../common/dtos/responses/DatabaseRole';
import styles from './styles.module.css';
import { fetchData } from './lib/data-fetching';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { ErrorScreen } from '../client/components/ErrorScreen/ErrorScreen';
import { PageBody } from './Cards';

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
    return <PageBody data={result} />
}


