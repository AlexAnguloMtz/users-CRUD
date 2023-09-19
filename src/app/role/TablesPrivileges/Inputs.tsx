import { AccordionDetails } from '@mui/material';
import styles from './styles.module.css';
import { CheckboxInput } from '../CheckboxInput';

export function Inputs({
    model,
    privilegeConsumer
}: {
    model: Array<string>,
    privilegeConsumer: (privilege: string) => void,
}): JSX.Element {
    return (
        <AccordionDetails>
            <div className={styles.inputs}>
                {
                    tablePrivileges().map((privilege: string, index: number) =>
                        <CheckboxInput
                            key={index}
                            isChecked={model.includes(privilege)}
                            labelText={privilege}
                            onClick={() => privilegeConsumer(privilege)} />
                    )
                }
            </div>
        </AccordionDetails>
    );
}

function tablePrivileges(): Array<string> {
    return [
        "SELECT",
        "INSERT",
        "UPDATE",
        "DELETE",
        "TRUNCATE",
        "REFERENCES",
        "TRIGGER",
    ];
}