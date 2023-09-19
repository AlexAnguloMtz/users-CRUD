import { TablePrivilege } from "./TablePrivilege"

export type DatabaseRole = {
    name: string,
    isSuperUser: boolean,
    canCreateRole: boolean,
    canCreateDatabase: boolean,
    canLogin: boolean,
    tablesPrivileges: Array<TablePrivileges>
}

// This function takes a role object and if it has a certain privilege,
// it returns the exact same role object but with that exact privilege removed.
// If it does not have that privilege, then it returns the exact same role object but with 
// that privilege added to it.
// This function is essentially a toggle for privileges in a role object.
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
