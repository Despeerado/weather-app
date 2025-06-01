// WeatherMapSpinner component - Graficky vylepšený spinner pro meteorologické mapy
import React from 'react'
import { 
  Box, 
  CircularProgress, 
  Typography,
  Fade,
  Paper
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { 
  CloudQueue, 
  Map, 
  Refresh 
} from '@mui/icons-material'
import '../WeatherMaps/WeatherMaps.css'

const WeatherMapSpinner = ({ 
  message = 'Načítám meteorologické vrstvy...',
  size = 'medium',
  showIcons = true,
  variant = 'default', // 'default', 'tiles', 'layers', 'initialization' 
  progress = null, // 0-100 pro progress indicator
  showProgress = false
}) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Různé varianty zpráv a ikon podle typu načítání
  const getVariantConfig = () => {
    switch (variant) {
      case 'tiles':
        return {
          message: 'Stahování meteorologických dlaždic...',
          primaryIcon: Map,
          secondaryIcon: CloudQueue,
          tertiaryIcon: Refresh,
          gradientText: '🗺️ Načítání mapových vrstev'
        }
      case 'layers':
        return {
          message: 'Přepínání meteorologických vrstev...',
          primaryIcon: CloudQueue,
          secondaryIcon: Map,
          tertiaryIcon: Refresh,
          gradientText: '☁️ Synchronizace vrstev'
        }
      case 'initialization':
        return {
          message: 'Inicializace mapové komponenty...',
          primaryIcon: Refresh,
          secondaryIcon: Map,
          tertiaryIcon: CloudQueue,
          gradientText: '⚙️ Spouštění mapy'
        }
      default:
        return {
          message: message || 'Načítám meteorologické vrstvy...',
          primaryIcon: CloudQueue,
          secondaryIcon: Map,
          tertiaryIcon: Refresh,
          gradientText: '☁️ Synchronizace meteorologických dat'
        }
    }
  }

  const variantConfig = getVariantConfig()
  const PrimaryIcon = variantConfig.primaryIcon
  const SecondaryIcon = variantConfig.secondaryIcon
  const TertiaryIcon = variantConfig.tertiaryIcon

  const getSize = () => {
    switch (size) {
      case 'small': return 32
      case 'large': return 80
      default: return 56
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'small': return 20
      case 'large': return 40
      default: return 28
    }
  }

  // Glassmorphism styling pro spinner overlay
  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDarkMode 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '20px',
    zIndex: 1000,
    padding: 2
  }

  // Styling pro hlavní spinner container
  const spinnerContainerStyles = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(255, 255, 255, 0.25)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    padding: { xs: 3, sm: 4 },
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: { xs: '280px', sm: '320px' },
    textAlign: 'center'
  }

  return (
    <Box sx={overlayStyles}>
      <Fade in timeout={300}>
        <Paper elevation={0} sx={spinnerContainerStyles}>
          {/* Statická ikona místo animovaných elementů */}
          {showIcons && (
            <Box sx={{ mb: 2 }}>
              <PrimaryIcon 
                sx={{ 
                  fontSize: getIconSize() + 8,
                  color: 'primary.main',
                  opacity: 0.7
                }} 
              />
            </Box>
          )}

          {/* Hlavní CircularProgress */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            {showProgress && progress !== null ? (
              // Progress verze
              <>
                <CircularProgress 
                  size={getSize()} 
                  thickness={3}
                  variant="determinate"
                  value={100}
                  sx={{ 
                    color: 'action.disabled',
                    position: 'absolute'
                  }}
                />
                <CircularProgress 
                  size={getSize()} 
                  thickness={3}
                  variant="determinate"
                  value={progress}
                  sx={{ 
                    color: 'primary.main',
                    filter: 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.3))',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
                {/* Progress text ve středu */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {Math.round(progress)}%
                </Box>
              </>
            ) : (
              // Nekonečný spinner
              <>
                <CircularProgress 
                  size={getSize()} 
                  thickness={3}
                  sx={{ 
                    color: 'primary.main',
                    filter: 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.3))'
                  }}
                />
                
                {/* Vnitřní kruh s gradientem */}
                <CircularProgress 
                  size={getSize() - 16} 
                  thickness={2}
                  variant="determinate"
                  value={75}
                  sx={{ 
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    color: 'secondary.main',
                    opacity: 0.6
                  }}
                />
              </>
            )}
          </Box>

          {/* Zpráva */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.primary',
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {variantConfig.message}
          </Typography>

          {/* Pomocný text */}
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              mt: 1,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              opacity: 0.8
            }}
          >
            {variantConfig.gradientText}
          </Typography>
        </Paper>
      </Fade>
    </Box>
  )
}


export default WeatherMapSpinner
