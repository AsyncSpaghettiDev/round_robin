import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { RoundRobinContext } from "../../store/context"
import classNames from './createProcess.module.css'

const INITIAL_STATE = (nextId: number) => ({
    id: nextId ?? 1,
    name: '',
    time: 1,
    memory: 1,
})


export const CreateProcess = () => {
    const { nextId, createProcess } = useContext(RoundRobinContext)
    const [process, setProcess] = useState<Process>(INITIAL_STATE(nextId))
    const [showForm, setShowForm] = useState<Boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        console.dir(target)
        setProcess({
            ...process,
            [target.name]: target.type === 'number' ? target.valueAsNumber : target.value
        })
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateNewProcess(process)
        createProcess(process)
        setProcess(INITIAL_STATE(nextId))
    }

    const validateNewProcess = (process: Process): boolean => {
        if (process.name === '')
            throw alert('Process name is required')
        if (process.time <= 0)
            throw alert('Process time must be greater than 0')
        if (process.memory <= 0)
            throw alert('Process memory must be greater than 0')

        return true
    }

    const handleShowForm = () => setShowForm(!showForm)

    return (
        <div className={`flex-column flex-wrap align-center my-4`}>
            <button className={`btn btn-primary`} onClick={handleShowForm}>Create Process</button>
            {showForm && (
                <form onSubmit={handleSubmit} className={`${classNames.create_process} flex-row flex-wrap align-center justify-center`}>
                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="name">Process Name</label>
                        <input className="input" type="text" name="name" id="name" value={process.name} onChange={handleInputChange} />
                    </div>

                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="time">Process Time (in seconds)</label>
                        <input className="input" min={0} type="number" name="time" id="time" value={process.time} onChange={handleInputChange} />
                    </div>

                    <div className={`input_control`}>
                        <label className='input_label' htmlFor="memory">Memory to use</label>
                        <input className="input" type="number" name="memory" id="memory" value={process.memory} onChange={handleInputChange} />
                    </div>

                    <div className={`${classNames.submit_control} ta-center`}>
                        <button className={`btn btn-primary ${classNames.submit}`} type="submit">Create</button>
                    </div>
                </form>
            )}
        </div>
    )
}
