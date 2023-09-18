import { TablePrivilege } from "./TablePrivilege"

export type DatabaseRole = {
    name: string,
    isSuperUser: boolean,
    canCreateRole: boolean,
    canCreateDatabase: boolean,
    canLogin: boolean,
    tablesPrivileges: Array<TablePrivileges>
}

export function togglePrivilege(role: DatabaseRole, privilege: TablePrivilege): DatabaseRole {
    const privilegeIndex = role.tablesPrivileges.findIndex(
        (tablePrivilege) =>
            tablePrivilege.tableName === privilege.tableName &&
            tablePrivilege.privileges.includes(privilege.name)
    );

    if (privilegeIndex !== -1) {
        const updatedPrivileges = [...role.tablesPrivileges];
        updatedPrivileges[privilegeIndex].privileges = updatedPrivileges[privilegeIndex].privileges.filter(
            (p) => p !== privilege.name
        );
        return {
            ...role,
            tablesPrivileges: updatedPrivileges,
        };
    } else {
        const updatedPrivileges = [...role.tablesPrivileges];
        const tableIndex = updatedPrivileges.findIndex(
            (table) => table.tableName === privilege.tableName
        );

        if (tableIndex !== -1) {
            updatedPrivileges[tableIndex].privileges.push(privilege.name);
        } else {
            updatedPrivileges.push({
                tableName: privilege.tableName,
                privileges: [privilege.name],
            });
        }

        return {
            ...role,
            tablesPrivileges: updatedPrivileges,
        };
    }
}
