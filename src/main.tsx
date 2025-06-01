import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import only essential styles (animations and base CSS variables if needed)
// Bootstrap Icons kept for any remaining icon usage
import 'bootstrap-icons/font/bootstrap-icons.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
