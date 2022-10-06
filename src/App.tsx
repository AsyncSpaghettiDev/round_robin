import './App.css'
import { CreateProcess } from './components/CreateProcess'
import { MemoryBar } from './components/MemoryBar'

const App = () => {
  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar used={100} total={200} />

      <CreateProcess />
    </main>
  )
}

export default App
