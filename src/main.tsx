import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './utility.css'
import './components.css'
import { GlobalContext } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </React.StrictMode>
)
