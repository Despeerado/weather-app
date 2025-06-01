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
import {
  Search,
  Star,
  StarBorder
} from '@mui/icons-material'
import { useWeather } from '../../contexts/WeatherContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import CityAutocomplete from './CityAutocomplete'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const { searchWeather, loading } = useWeather()
  const { addToFavorites, isFavorite } = useFavorites()

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
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardHeader
        avatar={<Search color="primary" />}
        title="Vyhledat město"
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
            <Box sx={{ flexGrow: 1 }}>
              <CityAutocomplete
                value={query}
                onChange={setQuery}
                onSelect={(city) => {
                  setQuery(city)
                  searchWeather(city)
                }}
              />
            </Box>
            
            <IconButton
              onClick={handleAddToFavorites}
              disabled={!query.trim()}
              color={isQueryFavorite ? 'warning' : 'default'}
              title="Přidat do oblíbených"
              sx={{ 
                border: 1, 
                borderColor: 'divider',
                borderRadius: 1,
                '&:hover': {
                  borderColor: 'warning.main'
                }
              }}
            >
              {isQueryFavorite ? <Star /> : <StarBorder />}
            </IconButton>

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
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Hledám...' : 'Hledat'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}



export default SearchForm
