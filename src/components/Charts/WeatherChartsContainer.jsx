// WeatherChartsContainer - hlavní komponenta pro zobrazení všech grafů
import React, { Suspense } from 'react'
import { Grid, Box, Typography, Fade, Skeleton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { BarChart } from '@mui/icons-material'
import { LazyComponent } from '../../hooks/useIntersectionObserver.jsx'

// Lazy load heavy chart components
const TemperatureTrend = React.lazy(() => import('./TemperatureTrend'))
const PrecipitationChart = React.lazy(() => import('./PrecipitationChart'))
const WeatherMetricsChart = React.lazy(() => import('./WeatherMetricsChart'))

// Loading skeleton for charts
const ChartSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="text" width="60%" height={40} />
    <Skeleton variant="rectangular" height={300} sx={{ mt: 1, borderRadius: 1 }} />
  </Box>
)

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
            <LazyComponent placeholder={<ChartSkeleton />}>
              <Suspense fallback={<ChartSkeleton />}>
                <TemperatureTrend forecastData={forecastData} />
              </Suspense>
            </LazyComponent>
          </Grid>

          {/* Pravděpodobnost srážek */}
          <Grid item xs={12} lg={6}>
            <LazyComponent placeholder={<ChartSkeleton />}>
              <Suspense fallback={<ChartSkeleton />}>
                <PrecipitationChart forecastData={forecastData} />
              </Suspense>
            </LazyComponent>
          </Grid>

          {/* Metriky počasí - celá šířka */}
          <Grid item xs={12}>
            <LazyComponent placeholder={<ChartSkeleton />}>
              <Suspense fallback={<ChartSkeleton />}>
                <WeatherMetricsChart forecastData={forecastData} />
              </Suspense>
            </LazyComponent>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

export default WeatherChartsContainer
