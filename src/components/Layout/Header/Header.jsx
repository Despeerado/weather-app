// Header component using MUI
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { CloudQueue, Palette } from '@mui/icons-material'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'
import ColorPaletteDemo from '../../UI/ColorPaletteDemo'

const Header = () => {
  const [isColorDemoOpen, setIsColorDemoOpen] = useState(false)

  const handleColorDemoOpen = () => {
    setIsColorDemoOpen(true)
  }

  const handleColorDemoClose = () => {
    setIsColorDemoOpen(false)
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
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
