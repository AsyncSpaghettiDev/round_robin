import classNames from './memoryBar.module.css'

interface MemoryBarProps {
    used: number;
    total: number;
    updateMemory: () => void;
}

export const MemoryBar = ({ used, total, updateMemory }: MemoryBarProps) => {
    const usedPercentage = (used / total) * 100

    return (
        <div className={`${classNames.container} flex-column align-center gap-row-2`}>
            <h2 className={`ta-center`} onClick={(updateMemory)}> {`Memory used: ${used} / ${total}`} </h2>
            <div className={`${classNames.memory} bg-500`} >
                <span className={`${classNames.used} ta-center bg-600 tc-600`} style={{ width: `${usedPercentage}%` }}>{`${used}%`}</span>
            </div>
        </div>
    )
}