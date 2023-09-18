import styles from './styles.module.css';
import Image, { StaticImageData } from 'next/image';

export function Card({
    headerText,
    children,
    className,
    iconSrc,
    iconAlt
}: {
    headerText: string,
    children: JSX.Element | Array<JSX.Element>,
    className?: string,
    iconSrc: StaticImageData,
    iconAlt: string,
}): JSX.Element {
    return (
        <div className={`${styles.card} ${className}`}>
            <div className={styles.top}>
                <h3 className={styles.header}>
                    {headerText}
                </h3>
                <div className={styles.iconContainer}>
                    <Image
                        className={styles.icon}
                        src={iconSrc}
                        alt={iconAlt} />
                </div>
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}