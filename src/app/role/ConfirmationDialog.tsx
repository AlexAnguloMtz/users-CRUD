import styles from './styles.module.css';
import { CircularProgress, Dialog, DialogTitle } from "@mui/material";
import { PrivilegeEditMessage } from './PrivilegeEditMessage';
import { BasicPrivilege } from './BasicPrivilege';

export type MessageProps = {
    actionName: 'otorgar' | 'remover',
    privilege: BasicPrivilege,
}

export function ConfirmationDialog({
    isOpen,
    isLoading,
    messageProps,
    onConfirm,
    onCancel,
}: {
    isOpen: boolean,
    isLoading: boolean,
    messageProps: MessageProps,
    onConfirm: () => void,
    onCancel: () => void,
}): JSX.Element {

    if (isLoading) {
        return (
            <Dialog open={isOpen}>
                <div style={{ textAlign: 'center', padding: '80px' }}>
                    <CircularProgress />
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog
            className={styles.dialog}
            open={isOpen} >
            <DialogTitle className={styles.dialogTitle}>
                Confirmar acción
            </DialogTitle>
            <PrivilegeEditMessage
                action={messageProps.actionName}
                privilege={messageProps.privilege} />
            <Actions
                onConfirm={onConfirm}
                onCancel={onCancel} />
        </Dialog>
    );
}

function Actions({ onConfirm, onCancel }: {
    onConfirm: () => void,
    onCancel: () => void,
}): JSX.Element {
    return (
        <div className={styles.dialogActions}>
            <button
                className={styles.dialogSecondaryAction}
                onClick={onCancel}>
                Cancelar
            </button>
            <button
                className={styles.dialogPrimaryAction}
                onClick={onConfirm}>
                Confirmar
            </button>
        </div>
    );
}