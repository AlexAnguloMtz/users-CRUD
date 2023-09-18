import styles from './styles.module.css';
import icon from '../../../../public/database-checkmark.png';
import { Card } from '../Card/Card';
import { TablePrivilegesInput } from './TablePrivilegesInput';

export function TablesPrivileges({ model }: {
    model: Array<TablePrivileges>
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
                        < TablePrivilegesInput model={model} />)
                }
            </div>
        </Card>
    );
}