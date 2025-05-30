// Error message component using Bootstrap
import React from 'react'

const ErrorMessage = ({ message, type = 'error', onRetry, onDismiss }) => {
  const alertType = type === 'warning' ? 'alert-warning' : 'alert-danger'
  const iconType = type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'
  
  return (
    <div className={`alert ${alertType} d-flex align-items-center`} role="alert">
      <div className="me-3">
        <i className={`bi bi-${iconType} fs-4`}></i>
      </div>
      <div className="flex-grow-1">
        <p className="mb-0">{message}</p>
      </div>
      <div className="ms-3 d-flex gap-2">
        {onRetry && (
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={onRetry}
            title="Zkusit znovu"
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Zkusit znovu
          </button>
        )}
        {onDismiss && (
          <button 
            className="btn-close" 
            onClick={onDismiss}
            aria-label="Zavřít"
          ></button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
