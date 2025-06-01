// PrecipitationChart component pro zobrazení pravděpodobnosti srážek
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { WaterDrop } from '@mui/icons-material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const PrecipitationChart = ({ forecastData }) => {
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

  // Vezmeme prvních 8 záznamů (24 hodin) pro detailní zobrazení
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
        label: 'Pravděpodobnost srážek (%)',
        data: next24Hours.map(item => Math.round(item.pop * 100)),
        backgroundColor: next24Hours.map(item => {
          const opacity = Math.max(0.3, item.pop) // Minimální opacity 0.3
          return isDarkMode 
            ? `rgba(52, 152, 219, ${opacity})`
            : `rgba(52, 152, 219, ${opacity})`
        }),
        borderColor: '#3498db',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
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
          }
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
            return `💧 Srážky: ${context.parsed.y}%`
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
        beginAtZero: true,
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
      }
    }
  }

  return (
    <Card sx={chartCardStyle}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <WaterDrop 
            sx={{ 
              mr: 1, 
              color: '#3498db'
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
            Pravděpodobnost srážek (24h)
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, height: '300px' }}>
          <Bar data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default PrecipitationChart
