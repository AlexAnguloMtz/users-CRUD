import styles from './styles.module.css';
import icon from '../../../../public/expand-more.svg';
import Image from 'next/image';

export function ExpandMoreIcon(): JSX.Element {
    return (
        <Image
            className={styles.icon}
            src={icon}
            alt='expandir' />
    );
}