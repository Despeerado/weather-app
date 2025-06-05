// CityAutocomplete component using MUI
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
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
  const [containerWidth, setContainerWidth] = useState(null)
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef(null)
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Handle click away from autocomplete
  const handleClickAway = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Optimalizovaný handleSelect s useCallback
  const handleSelect = useCallback((city) => {
    const cityName = `${city.name}, ${city.country}`
    
    // Okamžitě uzavřeme dropdown pro rychlejší UX
    setIsOpen(false)
    setSuggestions([])
    
    // Pak aktualizujeme hodnoty
    onChange(cityName)
    onSelect(cityName)
  }, [onChange, onSelect])

  // Optimalizovaný onChange handler
  const handleInputChange = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  // Optimalizovaný onFocus handler
  const handleInputFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setIsOpen(true)
    }
  }, [suggestions.length])

  // Zachytíme šířku kontejneru při prvním renderu
  useEffect(() => {
    if (inputRef.current) {
      let timeoutId
      
      const updateWidth = () => {
        // Debounce pro lepší výkon
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          const rect = inputRef.current?.getBoundingClientRect()
          if (rect && rect.width !== containerWidth) {
            setContainerWidth(rect.width)
          }
        }, 100)
      }
      
      updateWidth()
      
      // Aktualizujeme při resize okna
      const resizeObserver = new ResizeObserver(updateWidth)
      resizeObserver.observe(inputRef.current)
      
      return () => {
        clearTimeout(timeoutId)
        resizeObserver.disconnect()
      }
    }
  }, [containerWidth])

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [debouncedValue])

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setLoading(true)
    try {
      const cities = await geocodingService.searchCities(query)
      const limitedCities = cities.slice(0, 5)
      
      setSuggestions(limitedCities)
      setIsOpen(limitedCities.length > 0)
    } catch (error) {
      console.error('Error fetching city suggestions:', error)
      setSuggestions([])
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  // Memoizované styly pro lepší výkon
  const textFieldStyles = useMemo(() => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      background: isDarkMode 
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      transition: 'background-color 0.2s ease',
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
  }), [isDarkMode])

  const paperStyles = useMemo(() => ({
    width: '100%',
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.25)', 
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    maxHeight: 300,
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    transform: 'translateZ(0)',
    willChange: 'transform',
  }), [isDarkMode])

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%',
      // Zajistíme, že container má stálou velikost
      minHeight: '56px' // Standardní výška MUI TextField
    }}>
      <TextField
        ref={inputRef}
        fullWidth
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
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
        sx={textFieldStyles}
      />

      <Popper
        open={isOpen && suggestions.length > 0}
        anchorEl={inputRef.current}
        placement="bottom-start"
        disablePortal={false}
        keepMounted={false} // Zničí Popper při zavření pro lepší výkon
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
              padding: 8,
              altBoundary: true,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top-start'],
              padding: 8,
            },
          },
          {
            name: 'computeStyles',
            options: {
              // Zaokrouhlení pozice pro ostřejší rendering
              roundOffsets: ({ x, y }) => ({
                x: Math.round(x),
                y: Math.round(y),
              }),
            },
          },
        ]}
        style={{ 
          zIndex: 9999,
          width: containerWidth || 'auto',
          minWidth: containerWidth || 200, // Fallback minimální šířka
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            elevation={0}
            sx={paperStyles}
          >
            <Box sx={{ 
              maxHeight: 300, 
              overflowY: 'auto',
              // Vyhlazení scrollování
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(0, 0, 0, 0.2)',
                borderRadius: '3px',
              },
            }}>
              <List sx={{ py: 0 }}>
                {suggestions.map((city, index) => {
                  const key = `${city.name}-${city.country}-${city.lat}-${city.lon}` // Stabilnější klíč
                  return (
                    <ListItem key={key} disablePadding>
                      <ListItemButton
                        onClick={() => handleSelect(city)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          transition: 'background-color 0.15s ease',
                          '&:hover': {
                            background: isDarkMode 
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
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
                  )
                })}
              </List>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}

export default CityAutocomplete
