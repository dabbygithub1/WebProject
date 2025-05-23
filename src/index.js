import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import 'C:/SiteProject/calcora/src/styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)