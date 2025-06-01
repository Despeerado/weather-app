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
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CloudQueue sx={{ mr: 1, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none'
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
