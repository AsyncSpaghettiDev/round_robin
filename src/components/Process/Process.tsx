import { useEffect, useState } from "react"

import classNames from "./process.module.css"

interface Props {
    processes: Process[]
    setFinishedProcesses: (process: Process) => void
    updateMemory: (memory: number) => void
    clearProcesses: () => void
}


export const Process = ({ processes, setFinishedProcesses, updateMemory, clearProcesses }: Props) => {
    const [processList, setProcessList] = useState<Process[]>([])
    const [time, setTime] = useState<number>(0)
    const [currentProcess, setCurrentProcess] = useState<Process | null>(null)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [quantum, setQuantum] = useState<number>(0)

    const handleQuantumChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantum(e.target.valueAsNumber)

    const handleStart = () => {
        if (quantum === 0)
            return alert("Quantum must be greater than 0")

        if (processes.length === 0)
            return alert("No processes to run")

        if (processList.length !== 0)
            return alert("Processes are already running")

        setProcessList(processes)

        clearProcesses()

        setIsRunning(!isRunning)
    }

    return (
        <div className={`${classNames.robin} py-2 my-2`}>
            <div className={`flex-column align-center ${classNames.start}`}>
                <p className="ff-primary">Start the round robin algorithm</p>
                <div className={`input_control ${classNames.quantum_input}`}>
                    <label htmlFor="quantum">Set Quantum time</label>
                    <input className="input" min={1} onChange={handleQuantumChange} value={quantum} disabled={isRunning} type="number" name="quantum" id="quantum" />
                </div>
                <button className="btn btn-primary" onClick={handleStart}>
                    {isRunning ? "Stop" : "Start"}
                </button>
            </div>

        </div>
    )
}