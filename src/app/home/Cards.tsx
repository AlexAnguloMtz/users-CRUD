import styles from './styles.module.css';
import { DashboardData } from "@/app/common/dtos/responses/DashboardData";
import user from '../../../public/user.png';
import tables from '../../../public/database.png';
import { Card } from "./Card/Card";

export function Cards({ data }: {
    data: DashboardData
}): JSX.Element {
    return (
        <div className={styles.cards}>
            <Card
                title='Usuarios'
                imgSrc={user}
                imgAlt='usuarios y roles'
                amount={data.rolesCount}
                href="/roles" />
            <Card
                title='Tablas'
                imgSrc={tables}
                imgAlt='tablas'
                amount={data.tablesCount}
                href="/tables" />
        </div>
    );
}