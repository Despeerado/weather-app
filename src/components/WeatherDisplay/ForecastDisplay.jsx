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
    <Card elevation={3} sx={{ height: '100%', borderRadius: { xs: 2, sm: 3 } }}>
      <CardHeader
        avatar={<CalendarMonth color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />}
        title={
          <Typography 
            variant="h6" 
            component="h5" 
            fontWeight={600}
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            5denní předpověď
          </Typography>
        }
        sx={{ 
          pb: 1,
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 }
        }}
      />
      <CardContent sx={{ pt: 0, px: 0, pb: { xs: 1, sm: 2 } }}>
        <List disablePadding>
          {daily.map((day, index) => {
            const mainWeather = getMainWeatherForDay(day.items)
            const isToday = index === 0
            
            return (
              <React.Fragment key={day.date.toDateString()}>
                <ListItem
                  sx={{
                    py: { xs: 1.5, sm: 2 },
                    px: { xs: 2, sm: 3 },
                    backgroundColor: isToday ? 'primary.light' : 'transparent',
                    '&:hover': {
                      backgroundColor: isToday ? 'primary.light' : 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    gap: { xs: 1, sm: 2 },
                    flexWrap: { xs: 'wrap', md: 'nowrap' }
                  }}>
                    {/* Datum */}
                    <Box sx={{ minWidth: { xs: 60, sm: 80 } }}>
                      <Typography 
                        variant="body1" 
                        fontWeight={isToday ? 600 : 400}
                        color={isToday ? 'primary.main' : 'text.primary'}
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        {isToday ? 'Dnes' : formatDate(day.date)}
                      </Typography>
                    </Box>
                    
                    {/* Ikona počasí */}
                    <Avatar
                      src={`https://openweathermap.org/img/wn/${mainWeather.icon}.png`}
                      alt={mainWeather.description}
                      sx={{ 
                        width: { xs: 40, sm: 48 }, 
                        height: { xs: 40, sm: 48 }
                      }}
                    />
                    
                    {/* Popis počasí */}
                    <Box sx={{ 
                      flexGrow: 1, 
                      minWidth: { xs: 100, sm: 120 },
                      order: { xs: 3, md: 3 },
                      width: { xs: '100%', md: 'auto' }
                    }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          textTransform: 'capitalize',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                        noWrap
                      >
                        {mainWeather.description}
                      </Typography>
                    </Box>
                    
                    {/* Teploty */}
                    <Box sx={{ 
                      textAlign: 'right', 
                      minWidth: { xs: 60, sm: 80 },
                      order: { xs: 1, md: 4 }
                    }}>
                      <Typography 
                        component="span" 
                        variant="body1" 
                        fontWeight={600} 
                        color="primary.main"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        {day.maxTemp}°
                      </Typography>
                      <Typography 
                        component="span" 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          ml: 0.5,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        / {day.minTemp}°
                      </Typography>
                    </Box>
                    
                    {/* Detaily počasí */}
                    <Box sx={{ 
                      display: { xs: 'none', sm: 'flex' }, 
                      gap: 1, 
                      minWidth: { sm: 140, md: 160 },
                      order: { xs: 4, md: 5 }
                    }}>
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
