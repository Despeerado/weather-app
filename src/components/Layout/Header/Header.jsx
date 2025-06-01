// Header component using MUI
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, IconButton, Tabs, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CloudQueue, Home, Map } from '@mui/icons-material'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'

const Header = () => {
  const theme = useTheme()
  const location = useLocation()
  const isDarkMode = theme.palette.mode === 'dark'

  // Determine current tab based on location
  const getCurrentTab = () => {
    if (location.pathname === '/') return 0
    if (location.pathname === '/maps') return 1
    return 0
  }

  // Glassmorphism styling based on theme mode
  const glassmorphismStyles = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.1)' // Tmavší poloprůhlednost pro dark mode
      : 'rgba(255, 255, 255, 0.2)', // Světlejší poloprůhlednost pro light mode
    borderRadius: '0 0 16px 16px', // Zaoblení pouze spodních rohů
    boxShadow: isDarkMode
      ? '0 4px 30px rgba(0, 0, 0, 0.3)' // Silnější stín pro dark mode
      : '0 4px 30px rgba(0, 0, 0, 0.1)', // Jemnější stín pro light mode
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.2)' // Jemnější border pro dark mode
      : '1px solid rgba(255, 255, 255, 0.3)', // Výraznější border pro light mode
    borderTop: 'none', // Odstranit horní border
    color: 'text.primary',
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={glassmorphismStyles}
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
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                mr: 3
              }}
            >
              Počasník
            </Typography>

            {/* Navigation Tabs */}
            <Tabs 
              value={getCurrentTab()} 
              sx={{ 
                flexGrow: 1,
                display: { xs: 'none', sm: 'flex' }, // Hide on mobile
                '& .MuiTab-root': {
                  color: 'inherit',
                  minWidth: 'auto',
                  px: 2,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              <Tab 
                icon={<Home />} 
                label="Počasí" 
                component={Link} 
                to="/"
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                icon={<Map />} 
                label="Mapy" 
                component={Link} 
                to="/maps"
                sx={{ textTransform: 'none' }}
              />
            </Tabs>

            {/* Mobile Navigation Icons */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1 }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/"
                title="Aktuální počasí"
                sx={{ 
                  backgroundColor: getCurrentTab() === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRadius: 2
                }}
              >
                <Home />
              </IconButton>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/maps"
                title="Meteorologické mapy"
                sx={{ 
                  backgroundColor: getCurrentTab() === 1 ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRadius: 2
                }}
              >
                <Map />
              </IconButton>
            </Box>
          </Box>
          
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
