import styles from './styles.module.css';
import errorImg from '../../../../../public/error.png';
import Image from 'next/image';

export function ErrorScreen({ error }: {
    error: Error
}): JSX.Element {
    return (
        <div className={styles.errorScreen}>
            <h1 className={styles.errorScreenTitle}>Ocurrió un error</h1>
            <Image src={errorImg} alt='error inesperado' />
            <p>No se pudo cargar los datos, intente de nuevo más tarde</p>
        </div>
    );
}