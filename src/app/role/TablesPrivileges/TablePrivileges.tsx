import styles from './styles.module.css';
import { Accordion } from "@mui/material";
import { Inputs } from "./Inputs";
import { Top } from "./Top";

export function TablePrivileges({ tableName }: {
    tableName: string,
}): JSX.Element {
    return (
        <Accordion className={styles.accordion}>
            <Top headerText={tableName} />
            <Inputs />
        </Accordion>
    );
}