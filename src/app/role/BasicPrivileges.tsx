import { Card } from './Card/Card';
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
        <Card
            headerText='Privilegios Básicos'
            className={styles.basicPrivileges}>
            <div>
                <CheckboxInput
                    labelText={'CREATEROLE'}
                    onClick={onCanCreateRoles}
                    isChecked={canCreateRoles} />
                <CheckboxInput
                    labelText={'CREATEDB'}
                    onClick={onCanCreateDatabase}
                    isChecked={canCreateDatabases} />
                <CheckboxInput
                    labelText={'LOGIN'}
                    onClick={onCanLogin}
                    isChecked={canLogin} />
            </div>
        </Card >
    );
}