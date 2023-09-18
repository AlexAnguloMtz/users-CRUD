import styles from './styles.module.css';
import { Accordion } from "@mui/material";
import { Inputs } from "./Inputs";
import { Top } from "./Top";
import { TablePrivilege } from '@/app/common/dtos/responses/TablePrivilege';

export function TablePrivilegesInput({
    model,
    onPrivilegeClick: privilegeConsumer,
}: {
    model: TablePrivileges,
    onPrivilegeClick: (privilege: TablePrivilege) => void,
}): JSX.Element {

    function handlePrivilegeClick(privilege: string): void {
        privilegeConsumer({
            tableName: model.tableName,
            name: privilege
        });
    }

    return (
        <Accordion className={styles.accordion}>
            <Top headerText={model.tableName} />
            <Inputs
                model={model.privileges}
                privilegeConsumer={handlePrivilegeClick} />
        </Accordion>
    );
}