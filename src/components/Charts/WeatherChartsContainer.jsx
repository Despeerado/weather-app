// WeatherChartsContainer - hlavní komponenta pro zobrazení všech grafů
import React from 'react'
import { Grid, Box, Typography, Fade } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TemperatureTrend from './TemperatureTrend'
import PrecipitationChart from './PrecipitationChart'
import WeatherMetricsChart from './WeatherMetricsChart'
import { BarChart } from '@mui/icons-material'

const WeatherChartsContainer = ({ weatherData, forecastData }) => {
  const theme = useTheme()

  // Zobrazíme grafy pouze pokud máme forecast data
  if (!forecastData) {
    return null
  }

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ mt: 3, mb: 2 }}>
        {/* Nadpis sekce */}
        <Box display="flex" alignItems="center" mb={3}>
          <BarChart 
            sx={{ 
              mr: 1.5, 
              color: theme.palette.custom?.orangePantone || '#FF6B35',
              fontSize: 32
            }} 
          />
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Detailní analýza
          </Typography>
        </Box>

        {/* Grid s grafy */}
        <Grid container spacing={3}>
          {/* Teplotní trend - celá šířka na mobilech, polovina na desktopu */}
          <Grid item xs={12} lg={6}>
            <TemperatureTrend forecastData={forecastData} />
          </Grid>

          {/* Pravděpodobnost srážek */}
          <Grid item xs={12} lg={6}>
            <PrecipitationChart forecastData={forecastData} />
          </Grid>

          {/* Metriky počasí - celá šířka */}
          <Grid item xs={12}>
            <WeatherMetricsChart forecastData={forecastData} />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

export default WeatherChartsContainer
