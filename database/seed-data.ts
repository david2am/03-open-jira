interface SeedEntry {
    description: string;
    status: 'pending' | 'in-progress' | 'finished';
    createdAt: number;
}

interface SeedData {
    entries: SeedEntry[]
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem ipsum package',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En-Progreso: Example line package ipsum package',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Terminadas: Sort of package uuid lorem',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}