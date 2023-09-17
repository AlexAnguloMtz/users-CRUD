'use client';

import { useEffect, useState } from "react";
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { Nav } from "../client/components/Nav/Nav";
import { LoadingIndicator } from "../client/components/LoadingIndicator/LoadingIndicator";
import { ErrorScreen } from "../client/components/ErrorScreen/ErrorScreen";
import { fetchRole, updateRole } from "./lib/data-fetching";
import { RolForm } from './RolForm';
import { SuccessDialog } from "./SuccessDialog";
import { PageTemplate } from "../client/components/PageTemplate/PageTemplate";

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

    const [isSuccessDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isLoadingInitialData) {
            fetchRole(searchParams.name)
                .then(handleInitialFetchResult)
                .catch(handleInitialFetchResult)
        }
    }, []);

    useEffect(() => {
        if (isUpdating) {
            updateRole(result as DatabaseRole)
                .then(handleUpdatingResult)
                .catch(handleUpdatingResult)
        }
    }, [isUpdating]);

    function handleInitialFetchResult(result: Result): void {
        setLoadingInitialData(false);
        setResult(result);
    }

    function handleUpdatingResult(result: Result): void {
        setUpdating(false);
        setResult(result);
        setSuccessDialogOpen(true);
    }

    return (
        <PageTemplate>
            <>
                <SuccessDialog
                    open={isSuccessDialogOpen}
                    onDisclose={() => setSuccessDialogOpen(false)} />
                <Body
                    isLoading={isLoadingInitialData || isUpdating}
                    result={result}
                    roleConsumer={setResult}
                    onSubmit={() => setUpdating(true)} />
            </>
        </PageTemplate>
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
