'use client';

import styles from './styles.module.css';
import { PageTemplate } from "../client/components/PageTemplate";
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { CheckboxInput } from '../role/CheckboxInput';
import { RoleCreationRequest } from '../common/dtos/requests/RoleCreationRequest';
import { useState } from 'react';
import { LoadingIndicator } from '../client/components/LoadingIndicator/LoadingIndicator';
import { createRole } from './lib/data-fetching';
import { SuccessDialog } from './SuccessDialog';
import { ErrorDialog } from './ErrorDialog';
import { ConflictDialog } from './ConflictDialog';
import { roleCreationValidationSchema } from './lib/validations';

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
        validationSchema: roleCreationValidationSchema(),
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
                    open={successDialogOpen} />
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
                                    sobre las tablas existentes, en la página &ldquo;Usuarios&rdquo;
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
