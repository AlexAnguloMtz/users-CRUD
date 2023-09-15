import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import Image from 'next/image';
import image from '../../../../../public/table.png';
import { Detail } from './Detail';

export function DatabaseTableCard({ table }: {
    table: DatabaseTable
}): JSX.Element {
    return (
        <article className={styles.card}>
            <div className={styles.topWrapper}>
                <Image
                    className={styles.img}
                    src={image}
                    alt='database table' />
                <h3 className={styles.name}>{table.name}</h3>
            </div>
            <div className={styles.details}>
                <Detail name='Filas' value='9' />
                <Detail name='Creación' value='25/Nov/2022' />
            </div>
        </article>
    );
}

