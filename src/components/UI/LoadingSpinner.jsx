// Loading spinner component
import React from 'react'
import './LoadingSpinner.scss'

const LoadingSpinner = ({ size = 'medium', message = 'Načítání...' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
