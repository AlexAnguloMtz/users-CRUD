import styles from './styles.module.css';
import { Card } from './Card/Card';
import { CheckboxInput } from './CheckboxInput';
import icon from '../../../public/key.png';

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
            className={styles.basicPrivileges}
            iconSrc={icon}
            iconAlt='privilegios básicos'>
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