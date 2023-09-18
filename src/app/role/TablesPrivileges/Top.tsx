import styles from './styles.module.css';
import icon from '../../../../public/table.png';
import { AccordionSummary } from "@mui/material";
import { ExpandMoreIcon } from "../ExpandMoreIcon/ExpandMoreIcon";
import Image from 'next/image';

export function Top({ headerText }: {
    headerText: string
}): JSX.Element {
    return (
        <AccordionSummary
            className={styles.top}
            expandIcon={<ExpandMoreIcon />}>
            <div className={styles.topContent}>
                <Icon />
                <h4 className={styles.header}>{headerText}</h4>
            </div>
        </AccordionSummary>
    );
}

function Icon(): JSX.Element {
    return (
        <div className={styles.iconContainer}>
            <Image
                className={styles.icon}
                src={icon}
                alt='tabla de base de datos' />
        </div>
    );
}