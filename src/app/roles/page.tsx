import { Nav } from '../client/components/Nav/Nav';
import { DatabaseRole } from '../common/dtos/responses/DatabaseRole';
import { DatabaseRoleCard } from './DatabaseRoleCard/DatabaseRoleCard';
import { fetchData } from './data-fetching';
import styles from './styles.module.css';

export default async function Roles(): Promise<JSX.Element> {

    const models: Array<DatabaseRole> = await fetchData();

    return (
        <div>
            <Nav />
            <main className={styles.body}>
                {
                    models.map((model: DatabaseRole) =>
                        <DatabaseRoleCard model={model} />)
                }
            </main>
        </div>
    );
}