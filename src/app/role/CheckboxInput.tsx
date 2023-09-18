import { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { Checkbox } from '@mui/material';

export function CheckboxInput({
    name,
    isChecked,
    labelText,
    onClick,
    onChange
}: {
    isChecked: boolean,
    labelText: string,
    name?: string,
    onClick?: () => void,
    onChange?: (e: ChangeEvent<any>) => void,
}): JSX.Element {
    return (
        <div className={styles.checkboxWrapper}>
            <label className={styles.checkboxLabel}>{labelText}</label>
            <Checkbox
                checked={isChecked}
                onClick={onClick}
                onChange={onChange}
                name={name} />
        </div>
    );
}