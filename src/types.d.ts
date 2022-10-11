interface Memory {
    used: number;
    total: number;
}

interface Process {
    quantum: number;
    processName: string;
    processTime: number;
    processMemory: number;
}