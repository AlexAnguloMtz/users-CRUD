export enum BasicPrivilege {
    CREATE_ROLE,
    CREATE_DATABASE,
    LOGIN,
}

export function privilegeToString(privilege: BasicPrivilege): string {
    switch (privilege) {
        case BasicPrivilege.CREATE_ROLE:
            return 'Crear usuarios'
        case BasicPrivilege.CREATE_DATABASE:
            return 'Crear bases de datos'
        case BasicPrivilege.LOGIN:
            return 'Hacer login'
        default:
            throw new Error('Invalid privilege');
    }
}