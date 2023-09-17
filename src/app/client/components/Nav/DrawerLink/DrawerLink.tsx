import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Image, { StaticImageData } from "next/image";

export function DrawerLink({
    imgSrc,
    imgAlt,
    href,
    onClick,
    name,
}: {
    imgSrc: StaticImageData,
    imgAlt: string,
    href: string,
    onClick: () => void,
    name: string
}): JSX.Element {

    const router = useRouter();

    return (
        <div
            className={styles.drawerLink}
            onClick={() => router.push(href)}>
            <Image
                className={styles.image}
                src={imgSrc}
                alt={imgAlt} />
            <p className={styles.name}>
                {name}
            </p>
        </div>
    );
}