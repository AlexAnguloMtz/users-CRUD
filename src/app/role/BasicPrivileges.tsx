import { BasicPrivilege, privilegeToString } from './BasicPrivilege';
import { CheckboxInput } from './CheckboxInput';
import styles from './styles.module.css';

export function BasicPrivileges({
    onCanCreateRoles,
    onCanCreateDatabase,
    onCanLogin,
    canCreateRoles,
    canCreateDatabases,
    canLogin,
}: {
    onCanCreateRoles: () => void,
    onCanCreateDatabase: () => void,
    onCanLogin: () => void,
    canCreateRoles: boolean,
    canCreateDatabases: boolean,
    canLogin: boolean,
}): JSX.Element {
    return (
        <>
            <h3 className={styles.header}>Privilegios Básicos</h3>
            <div className={styles.basicPrivileges}>
                <CheckboxInput
                    labelText={privilegeToString(BasicPrivilege.CREATE_ROLE)}
                    onClick={onCanCreateRoles}
                    isChecked={canCreateRoles} />
                <CheckboxInput
                    labelText={privilegeToString(BasicPrivilege.CREATE_DATABASE)}
                    onClick={onCanCreateDatabase}
                    isChecked={canCreateDatabases} />
                <CheckboxInput
                    labelText={privilegeToString(BasicPrivilege.LOGIN)}
                    onClick={onCanLogin}
                    isChecked={canLogin} />
            </div>
        </>
    );
}