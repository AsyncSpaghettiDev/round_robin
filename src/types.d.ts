interface Memory {
    used: number;
    total: number;
}

interface Process {
    id: number;
    name: string;
    time: number;
    memory: number;
}