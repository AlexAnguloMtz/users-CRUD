'use client';

import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { Rolname } from './Rolname';
import { BasicPrivileges } from './BasicPrivileges';
import { TablesPrivileges } from './TablesPrivileges/TablesPrivileges.';

export function RolForm({
    role,
    roleConsumer,
    submitButtonEnabled,
    onSubmit,
}: {
    role: DatabaseRole,
    submitButtonEnabled: boolean,
    roleConsumer: (role: DatabaseRole) => void,
    onSubmit: () => void,
}): JSX.Element {
    return (
        <>
            <form className={styles.page}>
                <h1 className={styles.title}>Usuario</h1>
                <Rolname name={role.name} />
                <BasicPrivileges
                    canCreateRoles={role.canCreateRole}
                    canCreateDatabases={role.canCreateDatabase}
                    canLogin={role.canLogin}
                    onCanCreateDatabase={() => roleConsumer({ ...role, canCreateDatabase: !role.canCreateDatabase })}
                    onCanCreateRoles={() => roleConsumer({ ...role, canCreateRole: !role.canCreateRole })}
                    onCanLogin={() => roleConsumer({ ...role, canLogin: !role.canLogin })} />
                <TablesPrivileges />
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