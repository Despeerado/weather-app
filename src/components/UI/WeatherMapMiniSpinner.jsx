// WeatherMapMiniSpinner - Malý spinner pro mapové ovládací prvky
import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CloudQueue } from '@mui/icons-material'

const WeatherMapMiniSpinner = ({ 
  size = 16,
  message,
  showIcon = true 
}) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        padding: '4px 8px',
        background: isDarkMode 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
      }}
    >
      {showIcon && (
        <Box
          sx={{
            animation: 'float 2s ease-in-out infinite',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CloudQueue sx={{ fontSize: size }} />
        </Box>
      )}
      
      <CircularProgress 
        size={size} 
        thickness={4}
        sx={{ 
          color: 'primary.main',
          filter: 'drop-shadow(0 0 4px rgba(25, 118, 210, 0.3))'
        }}
      />
      
      {message && (
        <Box
          component="span"
          sx={{
            fontSize: '0.75rem',
            color: 'text.primary',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}
        >
          {message}
        </Box>
      )}
    </Box>
  )
}

export default WeatherMapMiniSpinner
