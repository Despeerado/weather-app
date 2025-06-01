// FavoriteCitiesDropdown component - Dropdown pro oblíbená města v hlavičce
import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Badge,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  Star,
  LocationOn,
  Delete,
  DeleteSweep,
  Favorite
} from '@mui/icons-material'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useWeather } from '../../contexts/WeatherContext'

const FavoriteCitiesDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { searchWeather } = useWeather()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCityClick = async (cityName) => {
    handleClose()
    await searchWeather(cityName)
  }

  const handleRemove = (e, id) => {
    e.stopPropagation()
    removeFromFavorites(id)
  }

  const handleClearAll = () => {
    clearFavorites()
    setShowClearDialog(false)
    handleClose()
  }

  if (favorites.length === 0) {
    return (
      <Tooltip title="Oblíbená města (prázdné)">
        <span>
          <IconButton
            color="inherit"
            disabled
            sx={{ 
              ml: 1,
              opacity: 0.4,
              display: { xs: 'none', sm: 'inline-flex' }, // Skrýt na mobilu když je prázdné
              '&.Mui-disabled': {
                color: 'inherit'
              }
            }}
          >
            <Star />
          </IconButton>
        </span>
      </Tooltip>
    )
  }

  return (
    <>
      <Tooltip title={`Oblíbená města (${favorites.length})`}>
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{ 
            ml: 1,
            position: 'relative'
          }}
        >
          <Badge 
            badgeContent={favorites.length} 
            color="warning"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.7rem',
                minWidth: 16,
                height: 16,
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText
              }
            }}
          >
            <Star />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: { xs: 200, sm: 220 },
              maxWidth: { xs: '90vw', sm: 280 },
              maxHeight: { xs: '70vh', sm: 400 },
              background: isDarkMode 
                ? 'rgba(45, 55, 72, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.15)',
            }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ 
          px: { xs: 1.5, sm: 2 }, 
          py: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <Typography 
            variant="subtitle2" 
            fontWeight={600} 
            color="text.primary"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Oblíbená města
          </Typography>
          <Tooltip title="Vymazat vše">
            <IconButton 
              onClick={() => setShowClearDialog(true)}
              color="error"
              size="small"
            >
              <DeleteSweep fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider />

        {/* Cities list */}
        {favorites.map((favorite, index) => (
          <MenuItem
            key={favorite.id}
            onClick={() => handleCityClick(favorite.name)}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LocationOn color="action" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={favorite.name}
              primaryTypographyProps={{ 
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            />
            <IconButton
              edge="end"
              onClick={(e) => handleRemove(e, favorite.id)}
              color="error"
              size="small"
              sx={{ ml: 1 }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>

      {/* Clear All Confirmation Dialog */}
      <Dialog
        open={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: isDarkMode 
              ? 'rgba(45, 55, 72, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDarkMode
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle>Odstranit všechna oblíbená města?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Opravdu chcete odstranit všechna oblíbená města? Tuto akci nelze vrátit zpět.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowClearDialog(false)}>
            Zrušit
          </Button>
          <Button onClick={handleClearAll} color="error" variant="contained">
            Odstranit vše
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FavoriteCitiesDropdown
