import { DatabaseTable } from "./DatabaseTable"
import { User } from "./User"

export type DashboardData = {
    users: Array<User>,
    tables: Array<DatabaseTable>
}