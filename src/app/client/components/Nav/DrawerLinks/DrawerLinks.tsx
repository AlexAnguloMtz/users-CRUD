import styles from './styles.module.css';
import { DrawerLink } from '../DrawerLink/DrawerLink';
import profileAvatar from '../../../../../../public/user.png';
import tables from '../../../../../../public/database.png';

export function DrawerLinks({ }): JSX.Element {
    return (
        <div className={styles.drawerLinks}>
            <DrawerLink
                imgSrc={profileAvatar}
                imgAlt={'usuarios'}
                href={'/roles'}
                onClick={() => { }}
                name='Usuarios' />
            <DrawerLink
                imgSrc={tables}
                imgAlt={'tablas'}
                href={'/tables'}
                onClick={() => { }}
                name='Tablas' />
        </div>
    );
}