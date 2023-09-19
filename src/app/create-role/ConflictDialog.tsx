import { DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";

export function ConflictDialog({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void,
}): JSX.Element {
    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle style={{ fontWeight: '600' }}>
                Error: Usuario ya existe
            </DialogTitle>
            <DialogContent style={{ fontWeight: '500', lineHeight: '1.6' }}>
                Ya existe un usuario con este nombre. Intenta con otro.
            </DialogContent>
            <DialogActions>
                <button
                    onClick={onClose}
                    style={{ backgroundColor: 'black', border: 'none', padding: '12px 20px', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>
                    Aceptar
                </button>
            </DialogActions>
        </Dialog>
    );
}