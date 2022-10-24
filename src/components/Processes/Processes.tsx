import { useState, useEffect } from 'react'

import classNames from './processes.module.css'

interface ProcessesProps {
    title: string
    processes: Process[]
}

export const Processes = ({ title, processes }: ProcessesProps) => {
    const [processList, setProcessList] = useState<Process[]>([])

    useEffect(() => {
        setProcessList(processes)
    }, [processes])

    return (
        <>
            <h2 className='ta-center'>{title}</h2>
            <table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>Process</th>
                        <th>Duration</th>
                        <th>Memory to use</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {processList.map((process, index) => (
                        <tr className='table-row' key={index}>
                            <td>{process.name}</td>
                            <td>{`${process.time} s`}</td>
                            <td>{`${process.memory} mb`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}