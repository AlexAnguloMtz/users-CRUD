import styles from './styles.module.css';
import check from '../../../public/check.png';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export function SuccessDeleteDialog({
    open,
    onDisclose,
}: {
    open: boolean,
    onDisclose: () => void,
}): JSX.Element {
    return (
        <Dialog
            open={open}>
            <DialogTitle className={styles.dialogTitle}>
                Se eliminó el usuario
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <p className={styles.dialogText}>
                    Serás redirigido a la página de Usuarios
                </p>
                <div className={styles.dialogDiscloseButtonContainer}>
                    <DiscloseButton
                        onClick={onDisclose} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DiscloseButton({ onClick }: {
    onClick: () => void
}): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={styles.dialogPrimaryAction}>
            Cerrar
        </button>
    );
}