import styles from './styles.module.css';

export function MenuButton({ onClick }: {
    onClick: () => void
}): JSX.Element {
    return (
        <button
            className={styles.menuButton}
            onClick={onClick}>
            <div className={styles.firstLine}></div>
            <div className={styles.secondLine}></div>
            <div className={styles.thirdLine}></div>
        </button>
    );
}