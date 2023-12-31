import styles from './styles.module.css';
import { DatabaseTable } from '@/app/common/dtos/responses/DatabaseTable';
import Image from 'next/image';
import image from '../../../../public/table.png';
import { capitalize } from '@/app/common/utils/utils';

export function DatabaseTableCard({ table }: {
    table: DatabaseTable
}): JSX.Element {
    return (
        <article
            className={styles.card}
            key={table.name}>
            <div className={styles.topWrapper}>
                <Image
                    className={styles.img}
                    src={image}
                    alt='database table' />
                <h3 className={styles.name}>{capitalize(table.name)}</h3>
            </div>
        </article>
    );
}

