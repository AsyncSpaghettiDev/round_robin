import { ReactNode, useState } from "react";
import { RoundRobinContext } from "./context";

interface Props {
    children: ReactNode;
}

const INITIAL_MEMORY = {
    used: 0,
    total: 100,
}

const PRELOADED_PROCESSES: Process[] = [
    {
        id: 1,
        name: 'Process 1',
        memory: 30,
        time: 6,
    },
    {
        id: 2,
        name: 'Process 2',
        memory: 20,
        time: 12,
    },
    {
        id: 3,
        name: 'Process 3',
        memory: 30,
        time: 8,
    },
    {
        id: 4,
        name: 'Process 4',
        memory: 40,
        time: 15,
    },
]

export const GlobalContext = ({ children }: Props) => {
    const [memory, setMemory] = useState<Memory>(INITIAL_MEMORY)
    const [createdProcesses, setCreatedProcesses] = useState<Process[]>(PRELOADED_PROCESSES)
    const [readyProcesses, setReadyProcesses] = useState<Process[]>([])

    const nextId = createdProcesses[createdProcesses?.length - 1]?.id + 1 ?? 1

    const updateMemory = (newMemory: number) => {
        setMemory(prev => {
            console.log('Previous: ', prev)
            console.log('Memory to add: ', newMemory)
            return {
                ...prev,
                used: prev.used + newMemory,
            }
        })
    }

    const increaseMemory = () => {
        const total = parseInt(prompt('How much memory do you want to use?') || '100');

        if (total < memory.used)
            return alert("You can't decrease memory, you can only increase it")

        setMemory(prev => ({ ...prev, total }))
    }

    const clearMemory = () => setMemory(INITIAL_MEMORY)

    const createProcess = (process: Process) => {
        const preview: number = process.memory

        if (preview > memory.total)
            return alert('Not enough memory')

        setCreatedProcesses([...createdProcesses, process])
    }

    const removeProcess = (id: number) => {
        const newProcesses = createdProcesses.filter(process => process.id !== id)
        setCreatedProcesses(newProcesses)
    }

    const addFinishedProcess = (process: Process) => {
        setReadyProcesses([...readyProcesses, process])
    }

    const clearCreatedProcesses = () => setCreatedProcesses([])

    const context = {
        memory,
        createdProcesses,
        readyProcesses,
        nextId,
        updateMemory,
        increaseMemory,
        clearMemory,
        createProcess,
        removeProcess,

        addFinishedProcess,
        clearCreatedProcesses,
    }

    return (
        <RoundRobinContext.Provider value={context}>
            {children}
        </RoundRobinContext.Provider>
    )
}