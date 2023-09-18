import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import styles from './styles.module.css';
import { ExpandMoreIcon } from '../ExpandMoreIcon/ExpandMoreIcon';
import { Card } from '../Card/Card';
import { Inputs } from './Inputs';
import { Top } from './Top';
import { TablePrivileges } from './TablePrivileges';

export function TablesPrivileges({ tables }: {
    tables: Array<string>
}): JSX.Element {
    return (
        <Card
            headerText='Privilegios Sobre Tablas'>
            <p className={styles.instructions}>Selecciona una tabla para editar los permisos del usuario</p>
            <div className={styles.body}>
                {
                    tables.map((table: string) => <TablePrivileges tableName={table} />)
                }
            </div>
        </Card>
    );
}