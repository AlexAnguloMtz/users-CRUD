import styles from './styles.module.css';
import icon from '../../../../public/database-checkmark.png';
import { Card } from '../Card/Card';
import { TablePrivileges } from './TablePrivileges';

export function TablesPrivileges({ tables }: {
    tables: Array<string>
}): JSX.Element {
    return (
        <Card
            headerText='Privilegios Sobre Tablas'
            iconSrc={icon}
            iconAlt='privilegios tablas'>
            <p className={styles.instructions}>Selecciona una tabla para editar los permisos del usuario</p>
            <div className={styles.body}>
                {
                    tables.map((table: string) => <TablePrivileges tableName={table} />)
                }
            </div>
        </Card>
    );
}