'use client';

import { useEffect, useState } from "react";
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { LoadingIndicator } from "../client/components/LoadingIndicator/LoadingIndicator";
import { ErrorScreen } from "../client/components/ErrorScreen/ErrorScreen";
import { deleteRole, fetchRole, updateRole } from "./lib/data-fetching";
import { RolForm } from './RolForm';
import { SuccessUpdateDialog } from "./SuccessUpdateDialog";
import { PageTemplate } from "../client/components/PageTemplate";
import { SuccessDeleteDialog } from "./SuccessDeleteDialog";
import { useRouter } from "next/navigation";

type SearchParams = {
    rolname: string
}

type Result = Error | DatabaseRole;

export default function RolePage({ searchParams }: {
    searchParams: SearchParams
}): JSX.Element {

    console.log('rolname = ' + searchParams.rolname);

    const [result, setResult] = useState<Result>(new Error());

    const [isLoadingInitialData, setLoadingInitialData] = useState<boolean>(true);

    const [isUpdating, setUpdating] = useState<boolean>(false);

    const [isDeleting, setDeleting] = useState<boolean>(false);

    const [isSuccessUpdateDialogOpen, setSuccessUpdateDialogOpen] = useState<boolean>(false);

    const [isSuccessDeleteDialogOpen, setSuccessDeleteDialogOpen] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (isLoadingInitialData) {
            fetchRole(searchParams.rolname)
                .then(handleInitialFetchResult)
                .catch(handleInitialFetchResult)
        }
    }, [isLoadingInitialData]);

    useEffect(() => {
        if (isUpdating) {
            updateRole(result as DatabaseRole)
                .then(handleUpdatingResult)
                .catch(handleUpdatingResult)
        }
    }, [isUpdating]);

    useEffect(() => {
        if (isDeleting) {
            deleteRole(result as DatabaseRole)
                .then(handleDeleteResult)
                .catch(handleDeleteResult)
        }
    }, [isDeleting]);

    function handleInitialFetchResult(result: Result): void {
        setLoadingInitialData(false);
        setResult(result);
    }

    function handleUpdatingResult(result: Result): void {
        setUpdating(false);
        setResult(result);
        setSuccessUpdateDialogOpen(true);
    }

    function handleDeleteResult(result: Result): void {
        setDeleting(false);
        setSuccessDeleteDialogOpen(true);
    }

    return (
        <PageTemplate>
            <>
                <SuccessUpdateDialog
                    open={isSuccessUpdateDialogOpen}
                    onDisclose={() => setSuccessUpdateDialogOpen(false)} />
                <SuccessDeleteDialog
                    open={isSuccessDeleteDialogOpen}
                    onDisclose={() => router.push('/roles')} />
                <Body
                    isLoading={isLoadingInitialData || isUpdating}
                    result={result}
                    roleConsumer={setResult}
                    onSubmit={() => setUpdating(true)}
                    onDelete={(role: DatabaseRole) => setDeleting(true)} />
            </>
        </PageTemplate>
    );
}

function Body({
    isLoading,
    result,
    roleConsumer,
    onSubmit,
    onDelete,
}: {
    isLoading: boolean,
    result: Error | DatabaseRole,
    roleConsumer: (role: DatabaseRole) => void,
    onSubmit: () => void,
    onDelete: (role: DatabaseRole) => void
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
            onSubmit={onSubmit}
            onDelete={onDelete} />
    );
}
