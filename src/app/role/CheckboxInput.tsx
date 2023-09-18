import styles from './styles.module.css';
import { Checkbox } from '@mui/material';

export function CheckboxInput({
    isChecked,
    labelText,
    onClick
}: {
    isChecked: boolean,
    labelText: string,
    onClick: () => void,
}): JSX.Element {
    return (
        <div className={styles.checkboxWrapper}>
            <label className={styles.checkboxLabel}>{labelText}</label>
            <Checkbox
                checked={isChecked}
                onClick={onClick} />
        </div>
    );
}