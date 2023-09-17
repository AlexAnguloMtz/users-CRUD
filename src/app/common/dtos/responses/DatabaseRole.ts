export type DatabaseRole = {
    name: string,
    isSuperUser: boolean,
    canCreateRole: boolean,
    canCreateDatabase: boolean,
    canLogin: boolean,
}