export type RoleCreationRequest = {
    name: string,
    password: string,
    canCreateDb: boolean,
    canCreateRole: boolean,
    canLogin: boolean,
}