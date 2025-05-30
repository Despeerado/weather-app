// Error message component
import React from 'react'
import './ErrorMessage.scss'

const ErrorMessage = ({ message, type = 'error', onRetry, onDismiss }) => {
  return (
    <div className={`error-message ${type}`}>
      <div className="error-content">
        <div className="error-icon">
          <i className={`bi bi-${type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}`}></i>
        </div>
        <div className="error-text">
          <p>{message}</p>
        </div>
        <div className="error-actions">
          {onRetry && (
            <button className="retry-btn" onClick={onRetry}>
              <i className="bi bi-arrow-clockwise"></i>
              Zkusit znovu
            </button>
          )}
          {onDismiss && (
            <button className="dismiss-btn" onClick={onDismiss}>
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
