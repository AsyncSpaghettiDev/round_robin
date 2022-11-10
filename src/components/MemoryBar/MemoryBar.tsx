import { useContext } from 'react'
import { RoundRobinContext } from '../../store/context'
import classNames from './memoryBar.module.css'


export const MemoryBar = () => {
    const { memory, increaseMemory } = useContext(RoundRobinContext)
    const { used, total } = memory
    const usedPercentage = (used / total) * 100

    return (
        <div className={`${classNames.container} flex-column align-center gap-row-2`}>
            <h2 className={`ta-center`} onClick={() => increaseMemory()}> {`Memory used: ${used} / ${total}`} </h2>
            <div className={`${classNames.memory} bg-500`} >
                <span
                    className={`${classNames.used} ta-center bg-600 tc-600`}
                    style={{ width: `${usedPercentage}%` }}>
                    {used > 0 && `${used}%`}
                </span>
            </div>
        </div>
    )
}