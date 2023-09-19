import { DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";

export function ErrorDialog({
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
                Error inesperado
            </DialogTitle>
            <DialogContent style={{ fontWeight: '500', lineHeight: '1.6' }}>
                No se pudo crear el usuario. Intenta de nuevo.
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