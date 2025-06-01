// CurrentWeatherDisplay component using MUI
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Divider
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  Water,
  Speed,
  Air,
  Visibility,
  WbSunny,
  Brightness3
} from '@mui/icons-material'

const CurrentWeatherDisplay = ({ data }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  
  if (!data) return null

  const {
    name,
    country,
    temperature,
    feelsLike,
    description,
    icon,
    humidity,
    pressure,
    windSpeed,
    windDirection,
    visibility,
    sunrise,
    sunset
  } = data

  // Glassmorphism styling for weather cards
  const weatherCardGlassmorphism = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.08)' // Jemná poloprůhlednost pro dark mode
      : 'rgba(255, 255, 255, 0.25)', // Světlejší poloprůhlednost pro light mode
    borderRadius: { xs: 2, sm: 3 },
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.3)' // Silnější stín pro dark mode
      : '0 8px 32px rgba(0, 0, 0, 0.1)', // Jemnější stín pro light mode
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.3)',
    height: '100%'
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getWindDirection = (degrees) => {
    const directions = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  const weatherDetails = [
    { icon: <Water />, label: 'Vlhkost', value: `${humidity}%` },
    { icon: <Speed />, label: 'Tlak', value: `${pressure} hPa` },
    { icon: <Air />, label: 'Vítr', value: `${windSpeed} m/s ${getWindDirection(windDirection)}` },
    { icon: <Visibility />, label: 'Viditelnost', value: `${(visibility / 1000).toFixed(1)} km` },
    { icon: <WbSunny />, label: 'Východ slunce', value: formatTime(sunrise) },
    { icon: <Brightness3 />, label: 'Západ slunce', value: formatTime(sunset) }
  ]

  return (
    <Card 
      elevation={0}
      sx={weatherCardGlassmorphism}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header s lokací */}
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          {name}, {country}
        </Typography>

        {/* Hlavní informace o počasí */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'center' }, 
          mb: 3, 
          gap: { xs: 2, sm: 3 },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center', 
            gap: { xs: 1, sm: 2 }
          }}>
            <Typography 
              variant="h1" 
              component="div" 
              color="primary" 
              sx={{ 
                fontWeight: 'bold', 
                lineHeight: 1,
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
              }}
            >
              {temperature}°C
            </Typography>
            <Avatar
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              sx={{ 
                width: { xs: 60, sm: 80 }, 
                height: { xs: 60, sm: 80 }
              }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                textTransform: 'capitalize', 
                mb: 1,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              {description}
            </Typography>
            <Chip 
              label={`Pocitově ${feelsLike}°C`}
              variant="outlined"
              color="info"
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        {/* Detailní informace */}
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {weatherDetails.map((detail, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'center' },
                  gap: { xs: 0.5, sm: 1.5 },
                  p: { xs: 1, sm: 2 },
                  borderRadius: 2,
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)' // Velmi jemná poloprůhlednost pro dark mode
                    : 'rgba(255, 255, 255, 0.15)', // Jemnější poloprůhlednost pro light mode
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: isDarkMode
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease',
                  textAlign: { xs: 'center', sm: 'left' },
                  '&:hover': {
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.25)',
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                      : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', fontSize: { xs: 16, sm: 24 } }}>
                  {detail.icon}
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {detail.label}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    noWrap
                  >
                    {detail.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}


export default CurrentWeatherDisplay
