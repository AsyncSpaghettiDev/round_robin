import { useState } from 'react'
import './App.css'
import { CreateProcess } from './components/CreateProcess'
import { MemoryBar } from './components/MemoryBar'
import { Processes } from './components/Processes'

const App = () => {
  const [memory, setMemory] = useState<Memory>({ used: 0, total: 100 })
  const [createdProcesses, setCreatedProcesses] = useState<Process[]>([])
  const [readyProcesses, setReadyProcesses] = useState<Process[]>([])

  const addProcess = (process: Process) => {
    const used: number = memory.used + process.processMemory

    if (used > memory.total)
      return alert('Not enough memory')

    setCreatedProcesses([...createdProcesses, process])
    setMemory({ ...memory, used })
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

  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar {...memory} updateMemory={assignMemory} />

      <CreateProcess onNewProcess={addProcess} />

      <Processes title='Added Processes' processes={createdProcesses} />

      <Processes title='Ready Processes' processes={readyProcesses} />

    </main>
  )
}

export default App
