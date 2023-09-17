import { DesktopDrawer } from '../DesktopDrawer/DesktopDrawer';
import { Nav } from '../Nav/Nav';
import styles from './styles.module.css';

export function PageTemplate({ children }: {
    children: JSX.Element
}): JSX.Element {
    return (
        <div className={styles.pageTemplate}>
            <Nav />
            <div className={styles.content}>
                <DesktopDrawer />
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
}