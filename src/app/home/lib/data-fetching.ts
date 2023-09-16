export async function fetchUsersCount(): Promise<number> {
    return fetch('http://localhost:3000/api/roles/count', { cache: 'no-store' })
        .then(async (response: Response) => {
            const data = await response.json();
            return data.count;
        });
}

export async function fetchTablesCount(): Promise<number> {
    return fetch('http://localhost:3000/api/tables/count', { cache: 'no-store' })
        .then(async (response: Response) => {
            const data = await response.json();
            return data.count;
        });
}