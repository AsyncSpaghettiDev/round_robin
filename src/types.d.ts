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

interface RoundRobin {
    memory: Memory;
    createdProcesses: Process[];
    readyProcesses: Process[];
    nextId: number;
    updateMemory: (newMemory: number) => void;
    increaseMemory: () => void;
    clearMemory: () => void;
    removeProcess: (id: number) => void;
    createProcess: (process: Process) => void;
    addFinishedProcess: (process: Process) => void;
    clearCreatedProcesses: () => void;
}