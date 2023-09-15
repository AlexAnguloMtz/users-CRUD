import styles from './styles.module.css';

import { DashboardData } from '@/app/common/dtos/responses/DashboardData';
import { Nav } from '@/app/client/components/Nav/Nav';
import { Cards } from './Cards';

export default async function Home(): Promise<JSX.Element> {

    const data: DashboardData = await fetchData();

    return (
        <div>
            <Nav />
            <main className={styles.page}>
                <Cards data={data} />
            </main>
        </div>
    );
}

async function fetchData(): Promise<DashboardData> {
    return Promise.resolve({
        users: [{}, {}, {}, {}],
        tables: [{ name: 'Proveedores' }]
    });
}