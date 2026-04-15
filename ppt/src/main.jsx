import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PreLab from './PreLab.jsx'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

function Root() {
  if (path === '/pre-lab') return <PreLab />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
