import styles from './styles.module.css';
import icon from '../../../../public/plus-solid.svg';
import Image from 'next/image';
import Link from 'next/link';

export function FloatingButton({ }: {
}): JSX.Element {
    return (
        <Link
            className={styles.floatingButton}
            href={'/create-role'}>
            <Image
                className={styles.icon}
                src={icon}
                alt={'crear nuevo'} />
        </Link>
    );
}