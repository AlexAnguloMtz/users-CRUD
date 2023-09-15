import styles from './styles.module.css';

export function Detail({ name, value }: {
    name: string,
    value: string,
}): JSX.Element {
    return (
        <div className={styles.detail}>
            <h4 className={styles.detailName}>{name}:</h4>
            <p className={styles.detailValue}>{value}</p>
        </div>
    );
}