import styles from './styles.module.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Image, { StaticImageData } from 'next/image';
import editIcon from '../../../../public/edit.svg';
import deleteIcon from '../../../../public/delete.svg';
import { Menu } from '@mui/material';

export default function RolePopUpMenu({
    anchorElement,
    open,
    onClose
}: {
    anchorElement: Element | null,
    open: boolean,
    onClose: () => void
}) {
    return (
        <Paper
            sx={{ width: 320, maxWidth: '100%' }}>
            <Menu
                open={open}
                anchorEl={anchorElement}
                onClose={onClose}>
                <MenuList
                    onClick={(e) => e.stopPropagation()}>
                    <MenuItem >
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText>Editar</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                        <ListItemText>Eliminar</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Paper>
    );
}

function Edit(): JSX.Element {
    return (
        <Icon
            src={editIcon}
            alt={'editar'} />
    );
}

function Delete(): JSX.Element {
    return (
        <Icon
            src={deleteIcon}
            alt={'eliminar'} />
    );
}

function Icon({
    src,
    alt
}: {
    src: StaticImageData,
    alt: string,
}): JSX.Element {
    return (
        <Image
            className={styles.popupMenuIcon}
            src={src}
            alt={alt} />
    );
}