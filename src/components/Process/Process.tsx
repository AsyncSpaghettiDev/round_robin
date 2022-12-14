import { useContext, useEffect, useState } from "react"
import { RoundRobinContext } from "../../store/context"

import classNames from "./process.module.css"


export const Process = () => {
    const {
        memory,
        updateMemory,
        addFinishedProcess,
        createdProcesses: processes,
        clearMemory,
        removeProcess,
    } = useContext(RoundRobinContext)

    const [processList, setProcessList] = useState<Process[]>([])
    const [time, setTime] = useState<number>(0)
    const [currentProcess, setCurrentProcess] = useState<Process | null>(null)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [initialQuantum, setInitialQuantum] = useState<number>(0)
    const [quantum, setQuantum] = useState<number>(0)

    let interval: ReturnType<typeof setTimeout>

    useEffect(() => {
        loadProcesses()
    }, [isRunning])

    useEffect(() => {
        if (!isRunning)
            return
        interval = setTimeout(() => {
            setTime(time + 1)
        }, 1000)
        return () => clearTimeout(interval)
    }, [time, isRunning])

    useEffect(() => {
        if (processList.length === 0)
            return
        if (currentProcess === null) {
            setQuantum(initialQuantum - 1)
            setCurrentProcess({ ...processList[0], time: processList[0].time - 1 })
            return
        }
        if (currentProcess.time === 0) {
            addFinishedProcess(currentProcess)
            const newList = processList.filter(process => process.id !== currentProcess.id)
            setProcessList(newList)
            updateMemory(-currentProcess.memory)
            setCurrentProcess(null)
            loadProcesses()
            if (newList.length === 0) {
                setIsRunning(false)
                clearInterval(interval)
            }
            return
        }
        if (quantum === 0) {
            setProcessList([...processList.slice(1), currentProcess])
            setCurrentProcess(null)
            setQuantum(initialQuantum)
            return
        }
        setCurrentProcess({ ...currentProcess, time: currentProcess.time - 1 })
        setQuantum(quantum - 1)
    }, [time])

    const loadProcesses = (): boolean => {
        if (!isRunning)
            return false

        const { total } = memory
        let used = 0

        console.log(used)
        console.log(total)
        console.log('-----------------')

        while (total > used) {
            if (processes.length === 0)
                break

            if (total < used + processes[0].memory)
                break

            const process = processes.shift()
            console.log(process)

            if (process) {
                setProcessList(prev => [...prev, process])
                removeProcess(process.id)
                updateMemory(process.memory)
                used += process.memory
            }
        }
        console.log(used)
        console.log(total)
        console.log('-----------------')

        return used > 0
    }

    const handleQuantumChange = (e: React.ChangeEvent<HTMLInputElement>) => setInitialQuantum(e.target.valueAsNumber)

    const handleStart = () => {
        if (isRunning) {
            setTime(0)
            setQuantum(initialQuantum)
            setProcessList([])
            clearMemory()
            return setIsRunning(false)
        }

        if (initialQuantum === 0)
            return alert("Quantum must be greater than 0")

        if (processes.length === 0)
            return alert("No processes to run")

        if (processList.length !== 0)
            return alert("Processes are already running")

        setIsRunning(!isRunning)
    }

    return (
        <div className={`${classNames.robin} py-2 my-2`}>
            <div className={`flex-column align-center ${classNames.start}`}>
                <p className="ff-primary">Start the round robin algorithm</p>
                <div className={`input_control ${classNames.quantum_input}`}>
                    <label htmlFor="quantum">Set Quantum time</label>
                    <input className="input" min={1} onChange={handleQuantumChange} value={initialQuantum} disabled={isRunning} type="number" name="quantum" id="quantum" />
                </div>
                <button className="btn btn-primary" onClick={handleStart}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                {
                    isRunning && (
                        <div className={`flex-column align-center ${classNames.border_bottom}`}>
                            <p className="ff-primary">Time: {time}</p>
                            <p className="ff-primary">Current process: {currentProcess?.name} ({currentProcess?.time}) </p>
                        </div>
                    )
                }
                {
                    isRunning && (
                        <div className="flex-column gap-row-2 align-center">
                            <p className="ff-primary">Processes to run: {processList.length}</p>
                            <ul>
                                {
                                    processList.map((process, index) => (
                                        <li key={index}>
                                            <p className="ff-primary">{process.name} ({process.time}'s)  </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>
    )
}