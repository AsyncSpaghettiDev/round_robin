import { useState } from 'react'
import './App.css'
import { CreateProcess } from './components/CreateProcess'
import { MemoryBar } from './components/MemoryBar'
import { Process } from './components/Process'
import { Processes } from './components/Processes'

const PRELOADED_PROCESSES: Process[] = [
  {
    id: 1,
    name: 'Process 1',
    memory: 10,
    time: 10,
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

const App = () => {
  const [memory, setMemory] = useState<Memory>({ used: 0, total: 100 })
  const [createdProcesses, setCreatedProcesses] = useState<Process[]>(PRELOADED_PROCESSES)
  const [readyProcesses, setReadyProcesses] = useState<Process[]>([])
  const nextId = createdProcesses[createdProcesses?.length - 1]?.id + 1 ?? 1

  const addProcess = (process: Process) => {
    const preview: number = process.memory

    if (preview > memory.total)
      return alert('Not enough memory')

    setCreatedProcesses([...createdProcesses, process])
  }

  const assignMemory = () => {
    const total = parseInt(prompt('How much memory do you want to use?') || '100');
    if (total < memory.used)
      return alert('You can\'t use less memory than you already have in use')

    setMemory({
      ...memory,
      total
    })
  }

  const setFinishedProcesses = (process: Process) => {
    setReadyProcesses([...readyProcesses, process])
  }

  const updateMemory = (newMemory: number) => {
    setMemory(prev => ({
      ...prev,
      used: prev.used + newMemory
    }))
  }

  const clearCreatedProcesses = () => setCreatedProcesses([])


  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar {...memory} updateMemory={assignMemory} />

      <CreateProcess nextId={nextId} onNewProcess={addProcess} />

      <Processes title='Added Processes' processes={createdProcesses} />

      <Process processes={createdProcesses} clearProcesses={clearCreatedProcesses} setFinishedProcesses={setFinishedProcesses} updateMemory={updateMemory} />

      <Processes title='Ready Processes' processes={readyProcesses} />

    </main>
  )
}

export default App
