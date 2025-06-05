import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import only essential styles (animations and base CSS variables if needed)
// Bootstrap Icons kept for any remaining icon usage
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import critical CSS and performance monitoring
import { injectCriticalCSS } from './utils/criticalCss.js'
import { initWebVitals } from './utils/webVitals.js'

// Inject critical CSS immediately to prevent FOUC
injectCriticalCSS()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize performance monitoring after app render
if (import.meta.env.PROD) {
  initWebVitals({
    debug: import.meta.env.DEV,
    analyticsId: import.meta.env.VITE_ANALYTICS_ID, // Optional: set in .env
  })
}
