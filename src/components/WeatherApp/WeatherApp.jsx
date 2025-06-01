// Main Weather Application component using MUI
import React from 'react'
import { Box, Grid } from '@mui/material'
import { useWeather } from '../../contexts/WeatherContext'
import SearchForm from '../SearchForm/SearchForm'
import CurrentWeatherDisplay from '../WeatherDisplay/CurrentWeatherDisplay'
import ForecastDisplay from '../WeatherDisplay/ForecastDisplay'
import WeatherChartsContainer from '../Charts/WeatherChartsContainer'
import LoadingSpinner from '../UI/LoadingSpinner'
import ErrorMessage from '../UI/ErrorMessage'

const WeatherApp = () => {
  const { currentWeather, forecast, loading, error } = useWeather()

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Search Form - Full width on all devices */}
        <Grid item xs={12}>
          <SearchForm />
        </Grid>
        
        {/* Loading State - Full width */}
        {loading && (
          <Grid item xs={12}>
            <LoadingSpinner />
          </Grid>
        )}
        
        {/* Error State - Full width */}
        {error && (
          <Grid item xs={12}>
            <ErrorMessage message={error} />
          </Grid>
        )}
        
        {/* Weather Content */}
        {currentWeather && (
          <>
            {/* Current Weather - Full width on mobile, half on desktop */}
            <Grid item xs={12} lg={6}>
              <CurrentWeatherDisplay data={currentWeather} />
            </Grid>
            
            {/* Forecast - Full width on mobile, half on desktop */}
            {forecast && (
              <Grid item xs={12} lg={6}>
                <ForecastDisplay data={forecast} />
              </Grid>
            )}
          </>
        )}
        
        {/* Weather Charts - zobrazí se pouze pokud máme forecast data */}
        {forecast && (
          <Grid item xs={12}>
            <WeatherChartsContainer 
              weatherData={currentWeather} 
              forecastData={forecast} 
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
  
}


export default WeatherApp
