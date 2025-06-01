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
import {
  Water,
  Speed,
  Air,
  Visibility,
  WbSunny,
  Brightness3
} from '@mui/icons-material'

const CurrentWeatherDisplay = ({ data }) => {
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
      elevation={3}
      sx={{ 
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.05))',
        backdropFilter: 'blur(10px)'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header s lokací */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {name}, {country}
        </Typography>

        {/* Hlavní informace o počasí */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="h1" 
              component="div" 
              color="primary" 
              sx={{ fontWeight: 'bold', lineHeight: 1 }}
            >
              {temperature}°C
            </Typography>
            <Avatar
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>
              {description}
            </Typography>
            <Chip 
              label={`Pocitově ${feelsLike}°C`}
              variant="outlined"
              color="info"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Detailní informace */}
        <Grid container spacing={2}>
          {weatherDetails.map((detail, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main' }}>
                  {detail.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {detail.label}
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
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
