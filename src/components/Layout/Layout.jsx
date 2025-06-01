// Layout component using MUI
import React from 'react'
import { Box, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  const theme = useTheme()
  
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
          py: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
