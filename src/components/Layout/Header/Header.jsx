// Header component using MUI
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CloudQueue, Palette } from '@mui/icons-material'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'
import ColorPaletteDemo from '../../UI/ColorPaletteDemo'

const Header = () => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const [isColorDemoOpen, setIsColorDemoOpen] = useState(false)

  const handleColorDemoOpen = () => {
    setIsColorDemoOpen(true)
  }

  const handleColorDemoClose = () => {
    setIsColorDemoOpen(false)
  }

  // Glassmorphism styling based on theme mode
  const glassmorphismStyles = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.1)' // Tmavší poloprůhlednost pro dark mode
      : 'rgba(255, 255, 255, 0.2)', // Světlejší poloprůhlednost pro light mode
    borderRadius: '0 0 16px 16px', // Zaoblení pouze spodních rohů
    boxShadow: isDarkMode
      ? '0 4px 30px rgba(0, 0, 0, 0.3)' // Silnější stín pro dark mode
      : '0 4px 30px rgba(0, 0, 0, 0.1)', // Jemnější stín pro light mode
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.2)' // Jemnější border pro dark mode
      : '1px solid rgba(255, 255, 255, 0.3)', // Výraznější border pro light mode
    borderTop: 'none', // Odstranit horní border
    color: 'text.primary',
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={glassmorphismStyles}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <CloudQueue sx={{ mr: 1, fontSize: { xs: 24, sm: 28 } }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Počasník
            </Typography>
          </Box>
          
          <IconButton
            color="inherit"
            onClick={handleColorDemoOpen}
            title="Zobrazit barevnou paletu"
            sx={{ mr: 1 }}
          >
            <Palette />
          </IconButton>
          
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>

      <Dialog 
        open={isColorDemoOpen} 
        onClose={handleColorDemoClose}
        maxWidth="md"
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
        <DialogTitle>Vlastní barevné schéma</DialogTitle>
        <DialogContent>
          <ColorPaletteDemo />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColorDemoClose} color="primary">
            Zavřít
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
