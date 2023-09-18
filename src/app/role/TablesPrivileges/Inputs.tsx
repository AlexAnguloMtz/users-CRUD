import { AccordionDetails } from '@mui/material';
import styles from './styles.module.css';
import { CheckboxInput } from '../CheckboxInput';

export function Inputs({ model }: {
    model: Array<string>
}): JSX.Element {
    return (
        <AccordionDetails>
            <div className={styles.inputs}>
                {
                    tablePrivileges().map((privilege: string) =>
                        <CheckboxInput
                            isChecked={model.includes(privilege)}
                            labelText={privilege}
                            onClick={() => { }} />
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