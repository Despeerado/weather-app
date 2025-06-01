// SearchForm component using MUI
import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  Search,
  Star,
  StarBorder
} from '@mui/icons-material'
import { useWeather } from '../../contexts/WeatherContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import CityAutocomplete from './CityAutocomplete'
import GeolocationButton from './GeolocationButton'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const { searchWeather, loading } = useWeather()
  const { addToFavorites, isFavorite } = useFavorites()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Glassmorphism styling for search form
  const searchFormGlassmorphism = {
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
      : '1px solid rgba(255, 255, 255, 0.3)'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (query.trim()) {
      await searchWeather(query.trim())
    }
  }

  const handleAddToFavorites = () => {
    if (query.trim()) {
      addToFavorites(query.trim())
    }
  }

  const isQueryFavorite = query.trim() && isFavorite(query)

  return (
    <Card elevation={0} sx={searchFormGlassmorphism}>
      <CardHeader
        avatar={<Search color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />}
        title="Vyhledat město"
        titleTypographyProps={{ 
          variant: 'h6', 
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
        sx={{ 
          pb: 1,
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 }
        }}
      />
      <CardContent sx={{ 
        pt: 0, 
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 }
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 1 }, 
            alignItems: 'stretch' 
          }}>
            <Box sx={{ flexGrow: 1, order: { xs: 1, sm: 1 } }}>
              <CityAutocomplete
                value={query}
                onChange={setQuery}
                onSelect={(city) => {
                  setQuery(city)
                  searchWeather(city)
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              gap: 1,
              order: { xs: 2, sm: 2 },
              flexDirection: { xs: 'row', sm: 'row' }
            }}>
              {/* Geolocation button */}
              <GeolocationButton />
              
              {/* Favorites button */}
              <IconButton
                onClick={handleAddToFavorites}
                disabled={!query.trim()}
                color={isQueryFavorite ? 'warning' : 'default'}
                title="Přidat do oblíbených"
                sx={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: isDarkMode
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                  minWidth: { xs: 48, sm: 'auto' },
                  '&:hover': {
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.25)',
                    borderColor: 'warning.main'
                  }
                }}
              >
                {isQueryFavorite ? <Star /> : <StarBorder />}
              </IconButton>

              {/* Search button */}
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !query.trim()}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Search />
                  )
                }
                sx={{ 
                  minWidth: { xs: 100, sm: 120 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                {loading ? 'Hledám...' : 'Hledat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}



export default SearchForm
