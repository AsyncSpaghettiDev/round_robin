import { useState } from "react"
import classNames from './createProcess.module.css'

const INITIAL_STATE = {
    quantum: 1,
    processName: '',
    processTime: 1,
    processMemory: 1,
}

interface Props {
    onNewProcess: (process: Process) => void
}

export const CreateProcess = ({ onNewProcess }: Props) => {
    const [process, setProcess] = useState<Process>(INITIAL_STATE)
    const [showForm, setShowForm] = useState<Boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setProcess({
            ...process,
            [e.target.name]: e.target.value
        })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNewProcess(process)
        setProcess(INITIAL_STATE)
    }

    const handleShowForm = () => setShowForm(!showForm)

    return (
        <div className={`flex-column flex-wrap align-center my-4`}>
            <button className={`btn btn-primary`} onClick={handleShowForm}>Create Process</button>
            {showForm && (
                <form onSubmit={handleSubmit} className={`${classNames.create_process} flex-row flex-wrap align-center justify-center`}>
                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="quantum">Quantum</label>
                        <input className="input" type="number" min={1} name="quantum" id="quantum" value={process.quantum} onChange={handleInputChange} />
                    </div>

                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="processName">Process Name</label>
                        <input className="input" type="text" name="processName" id="processName" value={process.processName} onChange={handleInputChange} />
                    </div>

                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="processTime">Process Time (in seconds)</label>
                        <input className="input" min={0} type="number" name="processTime" id="processTime" value={process.processTime} onChange={handleInputChange} />
                    </div>

                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="processMemory">Memory</label>
                        <input className="input" type="number" name="processMemory" id="processMemory" value={process.processMemory} onChange={handleInputChange} />
                    </div>

                    <div className={`${classNames.submit_control} ta-center`}>
                        <button className={`btn btn-primary ${classNames.submit}`} type="submit">Create</button>
                    </div>
                </form>
            )}
        </div>
    )
}
