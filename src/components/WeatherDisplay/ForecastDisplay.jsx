// ForecastDisplay component using MUI
import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  List,
  ListItem,
  Divider
} from '@mui/material'
import {
  CalendarMonth,
  Water,
  Air,
  Umbrella
} from '@mui/icons-material'

const ForecastDisplay = ({ data }) => {
  if (!data || !data.daily) return null

  const { daily } = data

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date)
  }

  const getMainWeatherForDay = (items) => {
    // Find the item closest to noon (12:00)
    const noonItem = items.reduce((closest, item) => {
      const itemHour = item.dt.getHours()
      const closestHour = closest.dt.getHours()
      const noonDiff = Math.abs(itemHour - 12)
      const closestNoonDiff = Math.abs(closestHour - 12)
      
      return noonDiff < closestNoonDiff ? item : closest
    })
    
    return noonItem
  }

  return (
    <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
      <CardHeader
        avatar={<CalendarMonth color="primary" />}
        title={
          <Typography variant="h6" component="h5" fontWeight={600}>
            5denní předpověď
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0, px: 0, pb: 2 }}>
        <List disablePadding>
          {daily.map((day, index) => {
            const mainWeather = getMainWeatherForDay(day.items)
            const isToday = index === 0
            
            return (
              <React.Fragment key={day.date.toDateString()}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 3,
                    backgroundColor: isToday ? 'primary.light' : 'transparent',
                    '&:hover': {
                      backgroundColor: isToday ? 'primary.light' : 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                    {/* Datum */}
                    <Box sx={{ minWidth: 80 }}>
                      <Typography 
                        variant="body1" 
                        fontWeight={isToday ? 600 : 400}
                        color={isToday ? 'primary.main' : 'text.primary'}
                      >
                        {isToday ? 'Dnes' : formatDate(day.date)}
                      </Typography>
                    </Box>
                    
                    {/* Ikona počasí */}
                    <Avatar
                      src={`https://openweathermap.org/img/wn/${mainWeather.icon}.png`}
                      alt={mainWeather.description}
                      sx={{ width: 48, height: 48 }}
                    />
                    
                    {/* Popis počasí */}
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ textTransform: 'capitalize' }}
                        noWrap
                      >
                        {mainWeather.description}
                      </Typography>
                    </Box>
                    
                    {/* Teploty */}
                    <Box sx={{ textAlign: 'right', minWidth: 80 }}>
                      <Typography component="span" variant="body1" fontWeight={600} color="primary.main">
                        {day.maxTemp}°
                      </Typography>
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        / {day.minTemp}°
                      </Typography>
                    </Box>
                    
                    {/* Detaily počasí */}
                    <Box sx={{ display: 'flex', gap: 1, minWidth: 160 }}>
                      <Chip 
                        icon={<Water />}
                        label={`${mainWeather.humidity}%`}
                        size="small"
                        variant="outlined"
                        color="info"
                      />
                      <Chip 
                        icon={<Air />}
                        label={`${mainWeather.windSpeed}m/s`}
                        size="small"
                        variant="outlined"
                        color="info"
                      />
                      {mainWeather.pop > 0 && (
                        <Chip 
                          icon={<Umbrella />}
                          label={`${Math.round(mainWeather.pop * 100)}%`}
                          size="small"
                          variant="outlined"
                          color="warning"
                        />
                      )}
                    </Box>
                  </Box>
                </ListItem>
                {index < daily.length - 1 && <Divider />}
              </React.Fragment>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}


export default ForecastDisplay
