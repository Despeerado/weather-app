// WeatherMetricsChart component pro vlhkost, tlak a vítr
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Speed } from '@mui/icons-material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const WeatherMetricsChart = ({ forecastData }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  
  if (!forecastData?.list || forecastData.list.length === 0) {
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

  // Vezmeme prvních 8 záznamů (24 hodin)
  const next24Hours = forecastData.list.slice(0, 8)

  const chartData = {
    labels: next24Hours.map(item => 
      new Date(item.dt).toLocaleTimeString('cs-CZ', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    ),
    datasets: [
      {
        label: 'Vlhkost (%)',
        data: next24Hours.map(item => item.humidity),
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        yAxisID: 'y',
        tension: 0.4,
        pointBackgroundColor: '#2ecc71',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Rychlost větru (m/s)',
        data: next24Hours.map(item => item.windSpeed),
        borderColor: '#9b59b6',
        backgroundColor: 'rgba(155, 89, 182, 0.1)',
        yAxisID: 'y1',
        tension: 0.4,
        pointBackgroundColor: '#9b59b6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
        callbacks: {
          title: (context) => {
            return `🕐 ${context[0].label}`
          },
          label: (context) => {
            const unit = context.dataset.label.includes('Vlhkost') ? '%' : 'm/s'
            const icon = context.dataset.label.includes('Vlhkost') ? '💧' : '💨'
            return `${icon} ${context.dataset.label}: ${context.parsed.y}${unit}`
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
            size: 10
          },
          maxRotation: 45
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max: 100,
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
            return value + '%'
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11
          },
          callback: function(value) {
            return value + ' m/s'
          }
        }
      }
    }
  }

  return (
    <Card sx={chartCardStyle}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Speed 
            sx={{ 
              mr: 1, 
              color: theme.palette.custom?.yinmnBlue || '#355691'
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
            Vlhkost a vítr (24h)
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, height: '300px' }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default WeatherMetricsChart
