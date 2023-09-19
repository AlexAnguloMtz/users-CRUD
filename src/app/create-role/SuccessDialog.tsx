import { DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import check from '../../../public/check.png';

export function SuccessDialog({
    open,
}: {
    open: boolean,
}): JSX.Element {

    const router = useRouter();

    const redirect = (): void => router.push('/roles');

    return (
        <Dialog
            open={open}
            onClose={redirect}>
            <DialogTitle style={{ fontWeight: '600' }}>
                Usuario creado
            </DialogTitle>
            <Image
                style={{ margin: '0 auto' }}
                src={check}
                alt={'palomita de éxito'} />
            <DialogContent style={{ fontWeight: '500', lineHeight: '1.6' }}>
                Serás redirigido a la página "Usuarios" para poder editar los permisos del nuevo usuario
            </DialogContent>
            <DialogActions>
                <button
                    onClick={redirect}
                    style={{ backgroundColor: 'black', border: 'none', padding: '12px 20px', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>
                    Aceptar
                </button>
            </DialogActions>
        </Dialog>
    );
}