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
                    labelText={'Crear usuarios'}
                    onClick={onCanCreateRoles}
                    isChecked={canCreateRoles} />
                <CheckboxInput
                    labelText={'Crear bases de datos'}
                    onClick={onCanCreateDatabase}
                    isChecked={canCreateDatabases} />
                <CheckboxInput
                    labelText={'Hacer login'}
                    onClick={onCanLogin}
                    isChecked={canLogin} />
            </div>
        </Card >
    );
}