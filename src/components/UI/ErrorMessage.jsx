// Error message component using MUI
import React from 'react'
import { 
  Alert, 
  AlertTitle, 
  IconButton, 
  Button, 
  Box 
} from '@mui/material'
import { Close, Refresh } from '@mui/icons-material'

const ErrorMessage = ({ message, type = 'error', onRetry, onDismiss, title }) => {
  const severity = type === 'warning' ? 'warning' : type === 'info' ? 'info' : 'error'
  
  return (
    <Alert 
      severity={severity}
      sx={{ 
        my: 2,
        borderRadius: 2,
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
      action={
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {onRetry && (
            <Button
              size="small"
              variant="outlined"
              onClick={onRetry}
              startIcon={<Refresh />}
              sx={{ 
                borderColor: 'currentColor',
                color: 'inherit',
                minWidth: 'auto'
              }}
            >
              Zkusit znovu
            </Button>
          )}
          {onDismiss && (
            <IconButton
              size="small"
              onClick={onDismiss}
              sx={{ color: 'inherit' }}
              aria-label="Zavřít"
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  )
}

export default ErrorMessage
