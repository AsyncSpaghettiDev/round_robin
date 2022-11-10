import { useContext, useState } from 'react'
import './App.css'
import { CreateProcess } from './components/CreateProcess'
import { MemoryBar } from './components/MemoryBar'
import { Process } from './components/Process'
import { Processes } from './components/Processes'
import { GlobalContext } from './store'
import { RoundRobinContext } from './store/context'

const App = () => {
  const { createdProcesses, readyProcesses } = useContext(RoundRobinContext)
  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar />

      <CreateProcess />

      <Processes title='Added Processes' processes={createdProcesses} />

      <Process />

      <Processes title='Ready Processes' processes={readyProcesses} />

    </main>
  )
}

export default App
