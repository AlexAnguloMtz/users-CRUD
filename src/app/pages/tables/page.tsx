import { Nav } from '@/app/client/components/Nav/Nav';
import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import { DatabaseTableCard } from './DatabaseTableCard/DatabaseTableCard';

export default async function Tables(): Promise<JSX.Element> {

    const tables: Array<DatabaseTable> = await fetchData();

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                <h1 className={styles.header}>Tablas</h1>
                <div className={styles.cards}>
                    {
                        tables.map((table: DatabaseTable) =>
                            <DatabaseTableCard table={table} />)
                    }
                </div>
            </main>
        </div>
    );
}

async function fetchData(): Promise<Array<DatabaseTable>> {
    return Promise.resolve(
        [
            {
                name: 'Ventas'
            },
            {
                name: 'Proveedores'
            },
            {
                name: 'Empleados'
            }
        ]
    );
} 