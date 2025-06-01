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
  InputAdornment,
  Popper,
  ClickAwayListener
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LocationOn } from '@mui/icons-material'
import { useDebounce } from '../../hooks/useDebounce'
import { geocodingService } from '../../services/geocodingService'

const CityAutocomplete = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef(null)
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Handle click away from autocomplete
  const handleClickAway = () => {
    setIsOpen(false)
  }

  // Update anchor element when input ref changes
  useEffect(() => {
    if (inputRef.current) {
      setAnchorEl(inputRef.current)
    }
  }, [])

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
        onFocus={() => {
          if (suggestions.length > 0) {
            setIsOpen(true)
          }
        }}
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
            background: isDarkMode 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            '&:hover': {
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused': {
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.3)',
            }
          }
        }}
      />

      <Popper
        open={isOpen && suggestions.length > 0}
        anchorEl={inputRef.current}
        placement="bottom-start"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ]}
        style={{ zIndex: 9999, width: inputRef.current?.getBoundingClientRect().width }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            elevation={0}
            sx={{
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' // Jemná poloprůhlednost pro dark mode
                : 'rgba(255, 255, 255, 0.25)', // Glassmorphism pro light mode
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 3,
              overflow: 'auto',
              maxHeight: 300,
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <List sx={{ py: 0 }}>
              {suggestions.map((city, index) => (
                <ListItem key={`${city.name}-${city.country}-${index}`} disablePadding>
                  <ListItemButton
                    onClick={() => handleSelect(city)}
                    sx={{
                      py: 1.5,
                      borderRadius: 1,
                      mx: 0.5,
                      my: 0.25,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        transform: 'translateY(-1px)',
                        boxShadow: isDarkMode
                          ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                          : '0 4px 20px rgba(0, 0, 0, 0.1)'
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
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}

export default CityAutocomplete
