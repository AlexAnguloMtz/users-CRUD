'use client';

import { DrawerLinks } from '../Nav/DrawerLinks/DrawerLinks';
import styles from './styles.module.css';

export function DesktopDrawer(): JSX.Element {
    return (
        <div className={styles.desktopDrawer}>
            <DrawerLinks />
        </div>
    );
}