'use client';

import { DrawerLinks } from '../Nav/DrawerLinks/DrawerLinks';
import { Nav } from '../Nav/Nav';
import styles from './styles.module.css';

export function PageTemplate({ children }: {
    children: JSX.Element
}): JSX.Element {
    return (
        <div className={styles.page}>
            <Nav />
            <PageContent>
                {children}
            </PageContent>
        </div>
    );
}

function PageContent({ children }: {
    children: JSX.Element
}): JSX.Element {
    return (
        <div className={styles.content}>
            <DesktopDrawer />
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}

function DesktopDrawer(): JSX.Element {
    return (
        <div className={styles.drawer}>
            <DrawerLinks />
        </div>
    );
}