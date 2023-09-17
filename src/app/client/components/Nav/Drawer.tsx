import { CloseButton } from './CloseButton/CloseButton';
import { DrawerLinks } from './DrawerLinks/DrawerLinks';
import styles from './styles.module.css';

export function Drawer({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}): JSX.Element {
    return (
        <div
            className={open ? styles.overlayActive : styles.overlay}
            onClick={onClose}>
            <div
                className={open ? styles.drawerActive : styles.drawer}
                onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} />
                <DrawerLinks />
            </div>
        </div>
    );
}