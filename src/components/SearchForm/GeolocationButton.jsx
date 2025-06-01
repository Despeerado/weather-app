// GeolocationButton component pro automatickou detekci polohy
import React from 'react'
import { IconButton, Tooltip, CircularProgress } from '@mui/material'
import { MyLocation, LocationDisabled } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useGeolocation } from '../../hooks/useGeolocation'
import { geocodingService } from '../../services/geocodingService'
import { useWeather } from '../../contexts/WeatherContext'

const GeolocationButton = () => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const { getCurrentPosition, loading, error, isSupported } = useGeolocation()
  const { searchWeather } = useWeather()

  const handleLocationClick = async () => {
    try {
      // Získej aktuální pozici
      const coords = await getCurrentPosition()
      
      // Převeď souřadnice na název města
      const locationData = await geocodingService.reverseGeocode(
        coords.latitude, 
        coords.longitude
      )
      
      if (locationData) {
        // Vyhledej počasí pro detekované město
        await searchWeather(locationData.name)
      } else {
        // Fallback - použij souřadnice přímo
        await searchWeather(`${coords.latitude},${coords.longitude}`)
      }
    } catch (error) {
      console.error('Geolocation error:', error)
      // Chyba se zobrazí automaticky přes useGeolocation hook
    }
  }

  // Glassmorphism styling pro button
  const buttonStyle = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.3)',
    color: theme.palette.text.primary,
    width: 48,
    height: 48,
    '&:hover': {
      background: isDarkMode 
        ? 'rgba(255, 255, 255, 0.12)' 
        : 'rgba(255, 255, 255, 0.35)',
      transform: 'translateY(-1px)',
      boxShadow: isDarkMode
        ? '0 8px 25px rgba(0, 0, 0, 0.4)'
        : '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    '&:disabled': {
      background: isDarkMode 
        ? 'rgba(255, 255, 255, 0.04)' 
        : 'rgba(255, 255, 255, 0.15)',
      color: theme.palette.text.disabled,
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  if (!isSupported) {
    return (
      <Tooltip title="Geolokace není podporována ve vašem prohlížeči">
        <span>
          <IconButton disabled sx={buttonStyle}>
            <LocationDisabled />
          </IconButton>
        </span>
      </Tooltip>
    )
  }

  const tooltipTitle = loading 
    ? 'Získávám vaši polohu...'
    : error 
    ? error 
    : 'Použít moji aktuální polohu'

  return (
    <Tooltip title={tooltipTitle} arrow>
      <span>
        <IconButton 
          onClick={handleLocationClick}
          disabled={loading}
          sx={buttonStyle}
          aria-label="Použít aktuální polohu"
        >
          {loading ? (
            <CircularProgress 
              size={24} 
              sx={{ 
                color: theme.palette.custom?.orangePantone || '#FF6B35'
              }} 
            />
          ) : (
            <MyLocation 
              sx={{ 
                color: error 
                  ? theme.palette.error.main 
                  : theme.palette.custom?.orangePantone || '#FF6B35'
              }} 
            />
          )}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default GeolocationButton
