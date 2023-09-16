import { DashboardData } from "@/app/common/dtos/responses/DashboardData";

export async function fetchDashboardData(): Promise<DashboardData> {
    return fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' })
        .then(async (response: Response) => {
            const data = await response.json();
            return data;
        });
}