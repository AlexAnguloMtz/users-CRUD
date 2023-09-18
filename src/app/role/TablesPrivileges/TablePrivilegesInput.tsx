import styles from './styles.module.css';
import { Accordion } from "@mui/material";
import { Inputs } from "./Inputs";
import { Top } from "./Top";

export function TablePrivilegesInput({ model }: {
    model: TablePrivileges,
}): JSX.Element {
    return (
        <Accordion className={styles.accordion}>
            <Top headerText={model.tableName} />
            <Inputs model={model.privileges} />
        </Accordion>
    );
}