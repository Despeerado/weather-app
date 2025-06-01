// Header component using MUI
import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { CloudQueue } from '@mui/icons-material'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backdropFilter: 'blur(10px)',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CloudQueue sx={{ mr: 1, fontSize: { xs: 24, sm: 28 } }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Počasník
          </Typography>
        </Box>
        
        <ThemeSwitcher />
      </Toolbar>
    </AppBar>
  )
}

export default Header
