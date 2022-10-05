import classNames from './memoryBar.module.css'

export const MemoryBar = ({ used, total }: MemoryProps) => {
    const usedPercentage = (used / total) * 100

    return (
        <div className={`${classNames.container} flex-column align-center gap-row-2`}>
            <h2 className={`ta-center`}> {`Memory used: ${used} / ${total}`} </h2>
            <div className={`${classNames.memory} bg-500`} >
                <span className={`${classNames.used} ta-center bg-600 tc-600`} style={{ width: `${usedPercentage}%` }}>{`${used}%`}</span>
            </div>
        </div>
    )
}