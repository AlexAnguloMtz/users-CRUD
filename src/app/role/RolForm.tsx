'use client';

import styles from './styles.module.css';
import { DatabaseRole, togglePrivilege } from "../common/dtos/responses/DatabaseRole";
import { Rolname } from './Rolname';
import { BasicPrivileges } from './BasicPrivileges';
import TablesPrivileges from './TablesPrivileges';
import { TablePrivilege } from '../common/dtos/responses/TablePrivilege';

export function RolForm({
    role,
    roleConsumer,
    submitButtonEnabled,
    onSubmit,
    onDelete,
}: {
    role: DatabaseRole,
    submitButtonEnabled: boolean,
    roleConsumer: (role: DatabaseRole) => void,
    onSubmit: () => void,
    onDelete: (role: DatabaseRole) => void
}): JSX.Element {

    function updateState(newState: DatabaseRole): void {
        if (!role.isSuperUser) {
            roleConsumer(newState);
        }
    }

    function handleCanLogin(): void {
        updateState({ ...role, canLogin: !role.canLogin });
    }

    function handleCanCreateDatabase(): void {
        updateState({ ...role, canCreateDatabase: !role.canCreateDatabase });
    }

    function handleCanCreateRole(): void {
        updateState({ ...role, canCreateRole: !role.canCreateRole });
    }

    return (
        <>
            <form className={styles.page}>
                <div className={styles.top}>
                    <div>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>Usuario</h1>
                            <DeleteButton
                                onClick={() => onDelete(role)}
                                visible={!role.isSuperUser} />
                        </div>
                        <Rolname name={role.name} />
                    </div>
                    {
                        (role.isSuperUser)
                            ? <SuperUserExplanation />
                            : <></>
                    }
                </div>
                <div className={styles.formBody}>
                    <BasicPrivileges
                        canCreateRoles={role.canCreateRole}
                        canCreateDatabases={role.canCreateDatabase}
                        canLogin={role.canLogin}
                        onCanCreateDatabase={handleCanCreateDatabase}
                        onCanCreateRoles={handleCanCreateRole}
                        onCanLogin={handleCanLogin} />
                    <TablesPrivileges
                        model={role.tablesPrivileges}
                        onPrivilegeClick={(privilege: TablePrivilege) => updateState(togglePrivilege(role, privilege))} />
                </div>
            </form>
            {
                (role.isSuperUser)
                    ? <></>
                    : <SubmitButton
                        onClick={onSubmit}
                        enabled={submitButtonEnabled} />
            }

        </>
    );
}

function SubmitButton({ onClick, enabled }: {
    onClick: () => void,
    enabled: boolean,
}): JSX.Element {
    return (
        <div className={styles.submitButtonContainer}>
            <button
                disabled={!enabled}
                type='button'
                onClick={onClick}
                className={(enabled) ? styles.submitButton : styles.submitButtonDisabled}>
                Guardar cambios
            </button>
        </div>
    );
}

function DeleteButton({ onClick, visible }: {
    onClick: () => void,
    visible: boolean,
}): JSX.Element {

    if (!visible) return <></>;

    return (
        <button
            className={styles.deleteButton}
            type='button'
            onClick={onClick}>
            Eliminar
        </button>
    );
}

function SuperUserExplanation(): JSX.Element {
    return (
        <p className={styles.superUserExplanation}>
            Este es un Super Usuario. Por el momento no es posible editar sus privilegios.
        </p>
    );
}