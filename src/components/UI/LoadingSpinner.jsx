// Loading spinner component using MUI
import React from 'react'
import { 
  Box, 
  CircularProgress, 
  Typography 
} from '@mui/material'

const LoadingSpinner = ({ size = 'medium', message = 'Načítání...' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24
      case 'large': return 60
      default: return 40
    }
  }

  const getPadding = () => {
    switch (size) {
      case 'small': return 2
      case 'large': return 6
      default: return 4
    }
  }
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: getPadding()
      }}
    >
      <CircularProgress 
        size={getSize()} 
        thickness={4}
        sx={{ 
          color: 'primary.main'
        }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: size === 'large' ? 2 : 1,
            fontSize: size === 'small' ? '0.75rem' : '0.875rem'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default LoadingSpinner
