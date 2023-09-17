'use client';

import { useState } from 'react';
import { MenuButton } from './MenuButton/MenuButton';
import styles from './styles.module.css';
import { MobileDrawer } from './MobileDrawer';
import { Logo } from './Logo';

export function Nav(): JSX.Element {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <nav className={styles.nav}>
            <MenuButton onClick={() => setDrawerOpen(true)} />
            <Logo />
            <MobileDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)} />
        </nav>
    );
}