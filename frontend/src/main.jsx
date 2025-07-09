import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { NoteProvider } from './context/NoteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NoteProvider>
  </StrictMode>,
)
