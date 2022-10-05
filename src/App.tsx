import './App.css'
import { MemoryBar } from './components/MemoryBar'

const App = () => {
  return (
    <main className="App">
      <h1 className='ta-center ff-primary'>Round Robin Simulator</h1>
      <MemoryBar used={100} total={200} />


    </main>
  )
}

export default App
