import styles from './styles.module.css';
import { AccordionSummary } from "@mui/material";
import { ExpandMoreIcon } from "../ExpandMoreIcon/ExpandMoreIcon";

export function Top({ headerText }: {
    headerText: string
}): JSX.Element {
    return (
        <AccordionSummary
            className={styles.top}
            expandIcon={<ExpandMoreIcon />}>
            <h4>{headerText}</h4>
        </AccordionSummary>
    );
}