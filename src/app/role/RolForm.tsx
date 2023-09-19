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
                </div>
                <div className={styles.formBody}>
                    <BasicPrivileges
                        canCreateRoles={role.canCreateRole}
                        canCreateDatabases={role.canCreateDatabase}
                        canLogin={role.canLogin}
                        onCanCreateDatabase={() => roleConsumer({ ...role, canCreateDatabase: !role.canCreateDatabase })}
                        onCanCreateRoles={() => roleConsumer({ ...role, canCreateRole: !role.canCreateRole })}
                        onCanLogin={() => roleConsumer({ ...role, canLogin: !role.canLogin })} />
                    <TablesPrivileges
                        model={role.tablesPrivileges}
                        onPrivilegeClick={(privilege: TablePrivilege) => roleConsumer(togglePrivilege(role, privilege))} />
                </div>
            </form>
            <SubmitButton
                onClick={onSubmit}
                enabled={submitButtonEnabled} />
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
