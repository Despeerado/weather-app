// Loading spinner component using Bootstrap
import React from 'react'

const LoadingSpinner = ({ size = 'medium', message = 'Načítání...' }) => {
  const sizeClass = size === 'small' ? 'spinner-border-sm' : ''
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4 weather-spinner">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Načítání...</span>
      </div>
      {message && (
        <p className="text-muted mt-3 mb-0">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
