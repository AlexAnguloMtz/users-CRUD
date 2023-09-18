'use client';

import { DrawerLinks } from '../Nav/DrawerLinks/DrawerLinks';
import { Nav } from '../Nav/Nav';
import styles from './styles.module.css';

export default function PageTemplatee({ children }: {
    children: JSX.Element
}): JSX.Element {
    return (
        <div className={styles.page}>
            <Nav />
            <div className={styles.content}>
                <div className={styles.drawer}>
                    <DrawerLinks />
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
}