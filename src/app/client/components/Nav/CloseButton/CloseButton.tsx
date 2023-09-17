import styles from './styles.module.css';

export function CloseButton(): JSX.Element {
    return (
        <div className={styles.closeButtonContainer}>
            <button className={styles.closeButton}>
                <div className={styles.firstLine}></div>
                <div className={styles.secondLine}></div>
            </button>
        </div>
    );
}