import styles from './styles.module.css';
import icon from '../../../../public/database-checkmark.png';
import { Card } from '../Card/Card';
import { TablePrivilegesInput } from './TablePrivilegesInput';
import { TablePrivilege } from '@/app/common/dtos/responses/TablePrivilege';

export function TablesPrivileges({
    model,
    onPrivilegeClick,
}: {
    model: Array<TablePrivileges>,
    onPrivilegeClick: (privilege: TablePrivilege) => void
}): JSX.Element {
    return (
        <Card
            headerText='Privilegios Sobre Tablas'
            iconSrc={icon}
            iconAlt='privilegios tablas'>
            <p className={styles.instructions}>Selecciona una tabla para editar los permisos del usuario</p>
            <div className={styles.body}>
                {
                    model.map((model: TablePrivileges) =>
                        < TablePrivilegesInput
                            model={model}
                            onPrivilegeClick={onPrivilegeClick} />)
                }
            </div>
        </Card>
    );
}