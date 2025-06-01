// CityAutocomplete component using MUI
import React, { useState, useEffect, useRef } from 'react'
import { 
  TextField, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  CircularProgress, 
  Box,
  Typography,
  InputAdornment
} from '@mui/material'
import { LocationOn } from '@mui/icons-material'
import { useDebounce } from '../../hooks/useDebounce'
import { geocodingService } from '../../services/geocodingService'

const CityAutocomplete = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [debouncedValue])

  const fetchSuggestions = async (query) => {
    setLoading(true)
    try {
      const cities = await geocodingService.searchCities(query)
      setSuggestions(cities.slice(0, 5))
      setIsOpen(cities.length > 0)
    } catch (error) {
      console.error('Error fetching city suggestions:', error)
      setSuggestions([])
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (city) => {
    const cityName = `${city.name}, ${city.country}`
    onChange(cityName)
    onSelect(cityName)
    setIsOpen(false)
    setSuggestions([])
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        ref={inputRef}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Zadejte název města..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn color="action" />
            </InputAdornment>
          ),
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />

      {isOpen && suggestions.length > 0 && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1300,
            mt: 0.5,
            maxHeight: 300,
            overflow: 'auto',
            borderRadius: 2,
          }}
        >
          <List sx={{ py: 0 }}>
            {suggestions.map((city, index) => (
              <ListItem key={`${city.name}-${city.country}-${index}`} disablePadding>
                <ListItemButton
                  onClick={() => handleSelect(city)}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={500}>
                        {city.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {city.state && `${city.state}, `}{city.country}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default CityAutocomplete
