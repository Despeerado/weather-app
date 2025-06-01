// FavoriteCitiesWidget component using MUI
import React, { useState } from 'react'
import { 
  Card, 
  CardHeader, 
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Collapse,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { 
  Star, 
  ExpandMore, 
  ExpandLess, 
  Delete, 
  LocationOn,
  DeleteSweep
} from '@mui/icons-material'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useWeather } from '../../contexts/WeatherContext'

const FavoriteCitiesWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { searchWeather } = useWeather()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  // Glassmorphism styling for favorites widget
  const favoritesGlassmorphism = {
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

  const handleCityClick = async (cityName) => {
    setIsOpen(false)
    await searchWeather(cityName)
  }

  const handleRemove = (e, id) => {
    e.stopPropagation()
    removeFromFavorites(id)
  }

  const handleClearAll = () => {
    clearFavorites()
    setShowClearDialog(false)
    setIsOpen(false)
  }

  if (favorites.length === 0) {
    return null
  }

  return (
    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
      <Card elevation={0} sx={favoritesGlassmorphism}>
        <CardHeader
          avatar={
            <Badge badgeContent={favorites.length} color="primary">
              <Star color="warning" sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Badge>
          }
          title="Oblíbená města"
          titleTypographyProps={{ 
            variant: 'h6', 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
          action={
            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
              <Tooltip title="Vymazat vše">
                <IconButton 
                  onClick={() => setShowClearDialog(true)}
                  color="error"
                  size="small"
                  sx={{ fontSize: { xs: 18, sm: 20 } }}
                >
                  <DeleteSweep />
                </IconButton>
              </Tooltip>
              <Tooltip title={isOpen ? 'Skrýt' : 'Zobrazit'}>
                <IconButton 
                  onClick={() => setIsOpen(!isOpen)}
                  size="small"
                  sx={{ fontSize: { xs: 18, sm: 20 } }}
                >
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Tooltip>
            </Box>
          }
          sx={{ 
            pb: 1,
            px: { xs: 2, sm: 3 },
            pt: { xs: 2, sm: 3 }
          }}
        />
        
        <Collapse in={isOpen}>
          <CardContent sx={{ 
            pt: 0,
            px: { xs: 0, sm: 0 },
            pb: { xs: 1, sm: 2 }
          }}>
            <List sx={{ py: 0 }}>
              {favorites.map((favorite, index) => (
                <ListItem 
                  key={favorite.id} 
                  divider={index < favorites.length - 1}
                  disablePadding
                  sx={{ px: { xs: 2, sm: 3 } }}
                >
                  <ListItemButton
                    onClick={() => handleCityClick(favorite.name)}
                    sx={{ 
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: { xs: 1, sm: 2 },
                      mx: { xs: 0, sm: 0 },
                      '&:hover': {
                        background: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }
                    }}
                  >
                    <LocationOn 
                      color="action" 
                      sx={{ 
                        mr: { xs: 1.5, sm: 2 },
                        fontSize: { xs: 18, sm: 20 }
                      }} 
                    />
                    <ListItemText 
                      primary={favorite.name}
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    />
                  </ListItemButton>
                  <ListItemSecondaryAction>
                    <Tooltip title="Odstranit z oblíbených">
                      <IconButton
                        edge="end"
                        onClick={(e) => handleRemove(e, favorite.id)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>

      {/* Clear All Confirmation Dialog */}
      <Dialog
        open={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: isDarkMode 
              ? 'rgba(45, 55, 72, 0.95)' // Tmavé sklo pro dark mode
              : 'rgba(255, 255, 255, 0.95)', // Světlé sklo pro light mode
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
    </Box>
  )
}

export default FavoriteCitiesWidget
