'use client';

import { useEffect, useState } from "react";
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { Nav } from "../client/components/Nav/Nav";
import { LoadingIndicator } from "../client/components/LoadingIndicator/LoadingIndicator";
import { ErrorScreen } from "../client/components/ErrorScreen/ErrorScreen";
import { fetchRole, updateRole } from "./lib/data-fetching";
import { RolForm } from './RolForm';

type SearchParams = {
    name: string
}

type Result = Error | DatabaseRole;

export default function RolePage({ searchParams }: {
    searchParams: SearchParams
}): JSX.Element {

    const [result, setResult] = useState<Result>(new Error());

    const [isLoadingInitialData, setLoadingInitialData] = useState<boolean>(true);

    const [isUpdating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (isLoadingInitialData) {
            fetchRole(searchParams.name)
                .then(handleResult)
                .catch(handleResult)
        }
    }, []);

    useEffect(() => {
        if (isUpdating) {
            updateRole(result as DatabaseRole)
                .then(handleResult)
                .catch(handleResult)
        }
    }, [isUpdating]);

    function handleResult(result: Result): void {
        setLoadingInitialData(false);
        setUpdating(false);
        setResult(result);
    }

    return (
        <div>
            <Nav />
            <Body
                isLoading={isLoadingInitialData || isUpdating}
                result={result}
                roleConsumer={setResult}
                onSubmit={() => setUpdating(true)} />
        </div>
    );
}

function Body({
    isLoading,
    result,
    roleConsumer,
    onSubmit,
}: {
    isLoading: boolean,
    result: Error | DatabaseRole,
    roleConsumer: (role: DatabaseRole) => void,
    onSubmit: () => void,
}): JSX.Element {
    if (isLoading) {
        return <LoadingIndicator />
    }
    if (result instanceof Error) {
        return <ErrorScreen error={result} />
    }
    return (
        <RolForm
            role={result}
            roleConsumer={roleConsumer}
            submitButtonEnabled={true}
            onSubmit={onSubmit} />
    );
}