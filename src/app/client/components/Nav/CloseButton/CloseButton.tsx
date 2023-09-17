import styles from './styles.module.css';

export function CloseButton({ onClick }: {
    onClick: () => void
}): JSX.Element {
    return (
        <div className={styles.closeButtonContainer}>
            <button
                className={styles.closeButton}
                onClick={onClick}>
                Cerrar
            </button>
        </div>
    );
}