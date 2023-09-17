import styles from './styles.module.css';
import { DatabaseRole } from "../common/dtos/responses/DatabaseRole";
import { DatabaseRoleCard } from './DatabaseRoleCard/DatabaseRoleCard';
import { Cards } from './PageBody';

export function PageBody({ data }: {
    data: Array<DatabaseRole>
}): JSX.Element {
    return (
        <>
            <h1 className={styles.header}>Usuarios</h1>
            <p className={styles.instructions}>Seleccione un usuario para ver y editar sus permisos</p>
            <Cards data={data} />
        </>
    );
}

