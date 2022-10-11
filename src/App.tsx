import { useState } from 'react'
import './App.css'
import { CreateProcess } from './components/CreateProcess'
import { MemoryBar } from './components/MemoryBar'
import { Processes } from './components/Processes'

const App = () => {
  const [memory, setMemory] = useState<Memory>({ used: 0, total: 100 })
  const [createdProcesses, setCreatedProcesses] = useState<Process[]>([])
  const [readyProcesses, setReadyProcesses] = useState<Process[]>([])

  const addProcess = (process: Process) => setCreatedProcesses([...createdProcesses, process])

  const assignMemory = () => setMemory({
    ...memory,
    total: parseInt(prompt('How much memory do you want to use?') || '0')
  })

  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar used={memory.used} total={memory.total} updateMemory={assignMemory} />

      <CreateProcess onNewProcess={addProcess} />

      <Processes title='Added Processes' processes={createdProcesses} />

      <Processes title='Ready Processes' processes={readyProcesses} />

    </main>
  )
}

export default App
