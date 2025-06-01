// ThemeSwitcher component using MUI
import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <Tooltip title={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}
        sx={{
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}


export default ThemeSwitcher
