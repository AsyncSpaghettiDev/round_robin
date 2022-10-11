import { useState, useEffect } from 'react'

import classNames from './processes.module.css'

interface ProcessesProps {
    title: string;
    processes: Process[];
}

export const Processes = ({ title, processes }: ProcessesProps) => {
    const [processList, setProcessList] = useState<Process[]>([])

    useEffect(() => {
        setProcessList(processes);
    }, [processes])

    return (
        <>
            <h2 className='ta-center'>{title}</h2>
            <table className={`mx-auto ${classNames.table}`}>
                <thead>
                    <tr>
                        <th>Quantum</th>
                        <th>Process</th>
                        <th>Duration</th>
                        <th>Memory to use</th>
                    </tr>
                </thead>
                <tbody>
                    {processList.map((process, index) => (
                        <tr key={index}>
                            <td className='py-2'>{process.quantum.toString().padStart(2, '0')}</td>
                            <td>{process.processName}</td>
                            <td>{process.processTime}</td>
                            <td>{process.processMemory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}