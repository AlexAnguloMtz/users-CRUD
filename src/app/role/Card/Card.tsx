import styles from './styles.module.css';

export function Card({ headerText, children, className }: {
    headerText: string,
    children: JSX.Element,
    className?: string,
}): JSX.Element {
    return (
        <div className={`${styles.card} ${className}`}>
            <h3 className={styles.header}>{headerText}</h3>
            {children}
        </div>
    );
}