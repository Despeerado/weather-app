import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import only essential styles (animations and base CSS variables if needed)
// Bootstrap Icons kept for any remaining icon usage
import 'bootstrap-icons/font/bootstrap-icons.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
