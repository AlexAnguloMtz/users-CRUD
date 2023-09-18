export type RoleCreationRequest = {
    name: string,
    canCreateDb: boolean,
    canCreateRole: boolean,
    canLogin: boolean,
}