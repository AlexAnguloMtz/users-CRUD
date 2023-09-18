'use client';

import styles from './styles.module.css';
import PageTemplate from "../client/components/PageTemplate/page";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { CheckboxInput } from '../role/CheckboxInput';
import { RoleCreationRequest } from '../common/dtos/requests/RoleCreationRequest';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { createRole } from './lib/data-fetching';

const initialState = {
    name: '',
    canCreateDb: false,
    canCreateRole: false,
    canLogin: false,
}

export default function CreateUser(): JSX.Element {

    const [isLoading, setLoading] = useState<boolean>(false);

    const [request, setRequest] = useState<RoleCreationRequest | undefined>(undefined);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema(),
        onSubmit: setRequest
    });

    useEffect(() => {
        if (request) {
            setLoading(true);
            createRole(request)
                .then(handleSuccess)
                .catch();
        }
    }, [request]);

    function handleSuccess(): void {
        setLoading(false);
        setDialogOpen(true);
    }

    function canSubmit(): boolean {
        return (
            formik.errors.name === undefined &&
            formik.values.name.length > 0
        );
    }

    return (
        <PageTemplate>
            <>
                <SuccessDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)} />
                {
                    (isLoading)
                        ? <LoadingIndicator />
                        :
                        <>
                            <h1 className={styles.header}>Crear Usuario</h1>
                            <form
                                className={styles.body}
                                onSubmit={formik.handleSubmit}>
                                <p className={styles.instructions}>
                                    Después de crear un usuario, podrás gestionar sus permisos
                                    sobre las tablas existentes, en la página "Usuarios"
                                </p>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Nombre de usuario"
                                    variant="outlined"
                                    margin="normal"
                                    autoComplete="off"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />

                                <h4 className={styles.privilegesHeader}>Privilegios básicos para este usuario</h4>

                                <CheckboxInput
                                    labelText='CREATEDB'
                                    isChecked={formik.values.canCreateDb}
                                    onChange={formik.handleChange}
                                    name='canCreateDb' />
                                <CheckboxInput
                                    labelText='CREATEROLE'
                                    isChecked={formik.values.canCreateRole}
                                    onChange={formik.handleChange}
                                    name='canCreateRole' />
                                <CheckboxInput
                                    labelText='LOGIN'
                                    isChecked={formik.values.canLogin}
                                    onChange={formik.handleChange}
                                    name='canLogin' />

                                <SubmitButton disabled={!canSubmit()} />
                            </form>
                        </>
                }
            </>
        </PageTemplate>
    );
}

function SubmitButton({ disabled }: {
    disabled: boolean
}): JSX.Element {
    return (
        <button
            className={disabled ? styles.submitButtonDisabled : styles.submitButton}
            disabled={disabled}>
            Crear usuario
        </button>
    );
}

function SuccessDialog({
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
                Usuario creado
            </DialogTitle>
            <DialogContent style={{ fontWeight: '500', lineHeight: '1.6' }}>
                Serás redirigido a la página "Usuarios" para poder editar los permisos del nuevo usuario
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

function validationSchema() {
    const maxLength: number = 20;
    return yup.object({
        name: yup
            .string()
            .required('El nombre de usuario es requerido')
            .max(maxLength, `El nombre de usuario debe tener máximo ${maxLength} caracteres`)
            .matches(/^[a-zA-Z_]+$/, 'El nombre de usuario solo debe contener letras y guión bajo (_)'),
    });
} 