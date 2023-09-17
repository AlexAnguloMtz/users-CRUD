import styles from './styles.module.css';
export function Logo(): JSX.Element {
    return (
        <div className={styles.logo}>
            <p>Gestor de Usuarios</p>
        </div>
    );
}