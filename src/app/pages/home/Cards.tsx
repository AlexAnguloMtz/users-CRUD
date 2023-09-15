import { DashboardData } from "@/app/common/dtos/responses/DashboardData";
import user from '../../../../public/user.png';
import tables from '../../../../public/database.png';
import { Card } from "./Card/Card";

export function Cards({ data }: {
    data: DashboardData
}): JSX.Element {
    return (
        <>
            <Card
                title='Usuarios y Roles'
                imgSrc={user}
                imgAlt='usuarios y roles'
                amount={data.users.length}
                href="/pages/users" />
            <Card
                title='Tablas'
                imgSrc={tables}
                imgAlt='tablas'
                amount={data.tables.length}
                href="/pages/tables" />
        </>
    );
}