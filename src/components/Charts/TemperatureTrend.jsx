// TemperatureTrend component s glassmorphism stylingem
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ThermostatAuto } from '@mui/icons-material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const TemperatureTrend = ({ forecastData }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  
  if (!forecastData?.daily || forecastData.daily.length === 0) {
    return null
  }

  // Glassmorphism styling
  const chartCardStyle = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.3)',
    height: '400px'
  }

  // Extrakce dat pro graf z 5-denní předpovědi
  const chartData = {
    labels: forecastData.daily.map(day => 
      new Date(day.date).toLocaleDateString('cs-CZ', { 
        weekday: 'short', 
        day: 'numeric',
        month: 'short'
      })
    ),
    datasets: [
      {
        label: 'Maximální teplota',
        data: forecastData.daily.map(day => day.maxTemp),
        borderColor: theme.palette.custom?.orangePantone || '#FF6B35',
        backgroundColor: `${theme.palette.custom?.orangePantone || '#FF6B35'}20`,
        fill: '+1',
        tension: 0.4,
        pointBackgroundColor: theme.palette.custom?.orangePantone || '#FF6B35',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Minimální teplota',
        data: forecastData.daily.map(day => day.minTemp),
        borderColor: theme.palette.custom?.yinmnBlue || '#355691',
        backgroundColor: `${theme.palette.custom?.yinmnBlue || '#355691'}20`,
        fill: 'origin',
        tension: 0.4,
        pointBackgroundColor: theme.palette.custom?.yinmnBlue || '#355691',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: isDarkMode 
          ? 'rgba(45, 55, 72, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: isDarkMode 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return `📅 ${context[0].label}`
          },
          label: (context) => {
            return `🌡️ ${context.dataset.label}: ${context.parsed.y}°C`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '°C'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  return (
    <Card sx={chartCardStyle}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <ThermostatAuto 
            sx={{ 
              mr: 1, 
              color: theme.palette.custom?.orangePantone || '#FF6B35' 
            }} 
          />
          <Typography 
            variant="h6" 
            component="h3"
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600
            }}
          >
            Teplotní trend
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, height: '300px' }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default TemperatureTrend
