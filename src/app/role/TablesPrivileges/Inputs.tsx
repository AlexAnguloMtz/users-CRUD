import { AccordionDetails } from '@mui/material';
import styles from './styles.module.css';
import { CheckboxInput } from '../CheckboxInput';

export function Inputs(): JSX.Element {
    return (
        <AccordionDetails>
            <div className={styles.inputs}>
                <CheckboxInput
                    isChecked={true}
                    labelText={'SELECT'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'INSERT'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'UPDATE'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'DELETE'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'TRUNCATE'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'REFERENCES'}
                    onClick={() => { }} />
                <CheckboxInput
                    isChecked={true}
                    labelText={'TRIGGER'}
                    onClick={() => { }} />
            </div>
        </AccordionDetails>
    );
}