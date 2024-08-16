import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TimerProvider } from './context/TimerContext.jsx'
import { SelectionProvider } from './context/SelectionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <TimerProvider>
    <SelectionProvider>
    <App />
    </SelectionProvider>
    </TimerProvider>
  </React.StrictMode>,
)
