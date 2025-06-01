// Layout component using MUI
import React from 'react'
import { Box, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  const theme = useTheme()
  const location = useLocation()
  
  // Stránky, které potřebují plnou šířku (bez Container)
  const fullWidthPages = ['/maps']
  const isFullWidth = fullWidthPages.includes(location.pathname)
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        background: theme.palette.custom?.gradientBackground || theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          py: isFullWidth ? { xs: 1, sm: 2 } : { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {isFullWidth ? (
          // Plná šířka pro mapy
          <Box sx={{ px: 0 }}>
            {children}
          </Box>
        ) : (
          // Standardní Container pro ostatní stránky
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            {children}
          </Container>
        )}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
