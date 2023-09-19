import * as yup from 'yup';

export function roleCreationValidationSchema() {
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