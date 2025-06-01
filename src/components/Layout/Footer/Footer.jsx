// Footer component using MUI
import React from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CloudQueue } from '@mui/icons-material'

const Footer = () => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Glassmorphism styling for footer
  const footerGlassmorphismStyles = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.05)' // Velmi jemná poloprůhlednost pro dark mode
      : 'rgba(255, 255, 255, 0.15)', // Jemnější poloprůhlednost pro light mode
    borderRadius: '16px 16px 0 0', // Zaoblení pouze horních rohů
    boxShadow: isDarkMode
      ? '0 -4px 30px rgba(0, 0, 0, 0.2)' // Stín směrem nahoru pro dark mode
      : '0 -4px 30px rgba(0, 0, 0, 0.05)', // Jemnější stín pro light mode
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)',
    borderBottom: 'none', // Odstranit spodní border
    mt: 'auto',
    py: { xs: 3, md: 4 }
  }
  return (
    <Box 
      component="footer" 
      sx={footerGlassmorphismStyles}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              &copy; 2025 Počasník Weather App. Všechna práva vyhrazena.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'flex-start', md: 'flex-end' }, 
              alignItems: 'center',
              mt: { xs: 1, md: 0 }
            }}>
              <CloudQueue sx={{ mr: 1, fontSize: { xs: 14, sm: 16 } }} color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                Powered by OpenWeatherMap API
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}


export default Footer
