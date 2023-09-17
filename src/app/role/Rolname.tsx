import styles from './styles.module.css';

export function Rolname({ name }: {
    name: string
}): JSX.Element {
    return (
        <p className={styles.roleName}>
            {name}
        </p>
    );
}
