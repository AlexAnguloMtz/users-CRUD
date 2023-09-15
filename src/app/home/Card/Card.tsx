import styles from './styles.module.css';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

export function Card({
    title,
    imgSrc,
    imgAlt,
    amount,
    href,
}: {
    title: string,
    imgSrc: StaticImageData,
    imgAlt: string,
    amount: number,
    href: string,
}): JSX.Element {
    return (
        <Link
            className={styles.card}
            href={href}>
            <div className={styles.dataWrapper}>
                <Image
                    className={styles.img}
                    src={imgSrc}
                    alt={imgAlt} />
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        {title}
                    </h3>
                    <p className={styles.text}>{amount} {amountUnit(amount)}</p>
                </div>
            </div>
        </Link>
    );
}

function amountUnit(amount: number): string {
    return `elemento${amount === 1 ? '' : 's'}`;
}