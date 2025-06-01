// Footer component using MUI
import React from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import { CloudQueue } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        borderTop: 1, 
        borderColor: 'divider',
        mt: 'auto',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              &copy; 2025 Počasník Weather App. Všechna práva vyhrazena.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
              <CloudQueue sx={{ mr: 1, fontSize: 16 }} color="action" />
              <Typography variant="body2" color="text.secondary">
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
