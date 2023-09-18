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
    password: '',
    canCreateDb: false,
    canCreateRole: false,
    canLogin: false,
}

export default function CreateUser(): JSX.Element {

    const [isLoading, setLoading] = useState<boolean>(false);

    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    const [conflictDialogOpen, setConflictDialogOpen] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema(),
        onSubmit: (request: RoleCreationRequest) => {
            setLoading(true);
            createRole(
                request,
                handleConflict,
                handleError,
                handleSuccess
            );
        }
    });

    function handleSuccess(): void {
        setLoading(false);
        setSuccessDialogOpen(true);
    }

    function handleError(): void {
        setLoading(false);
        setErrorDialogOpen(true);
    }

    function handleConflict(): void {
        setLoading(false);
        setConflictDialogOpen(true);
    }

    return (
        <PageTemplate>
            <>
                <SuccessDialog
                    open={successDialogOpen}
                    onClose={() => setSuccessDialogOpen(false)} />
                <ErrorDialog
                    open={errorDialogOpen}
                    onClose={() => setErrorDialogOpen(false)} />
                <ConflictDialog
                    open={conflictDialogOpen}
                    onClose={() => setConflictDialogOpen(false)} />
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
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    margin="normal"
                                    autoComplete="off"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
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
                                <SubmitButton />
                            </form>
                        </>
                }
            </>
        </PageTemplate>
    );
}

function SubmitButton(): JSX.Element {
    return (
        <button className={styles.submitButton}>
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

function ErrorDialog({
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

function ConflictDialog({
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

function validationSchema() {
    const usernameMaxLength: number = 20;
    const passwordMinLength: number = 8;
    const passwordMaxLength: number = 50;
    return yup.object({
        name: yup
            .string()
            .required('El nombre de usuario es requerido')
            .max(usernameMaxLength, `El nombre de usuario debe tener máximo ${usernameMaxLength} caracteres`)
            .matches(/^[a-zA-Z_]+$/, 'El nombre de usuario solo debe contener letras y guión bajo (_)'),
        password: yup
            .string()
            .required('La contraseña es requerida')
            .min(8, `La contraseña debe tener al menos ${passwordMinLength} caracteres`)
            .max(50, `La contraseña debe tener máximo ${passwordMaxLength} caracteres`)
            .matches(/^[a-zA-Z0-9]+$/, 'Sólo se admiten mayúsculas, minúsculas y números')
    });
} 