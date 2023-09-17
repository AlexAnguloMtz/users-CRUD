import { BasicPrivilege, privilegeToString } from './BasicPrivilege';
import styles from './styles.module.css';

export function PrivilegeEditMessage({ action, privilege }: {
    action: 'otorgar' | 'remover',
    privilege: BasicPrivilege,
}): JSX.Element {
    return (
        <>
            <p style={{ padding: '0 16px', fontSize: '18px' }}>
                ¿Desea
                <em className={styles.emphasis}>{` ${action} `}</em>
                el siguiente permiso al usuario?
            </p>
            <p style={{ padding: '30px 0 50px 0', textAlign: 'center', fontWeight: 800, fontSize: '18px' }}>
                {privilegeToString(privilege)}
            </p>
        </>
    );
}