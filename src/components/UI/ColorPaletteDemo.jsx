// Color Palette Demo Component - pouze pro testování custom barev
import React from 'react'
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  Chip,
  useTheme 
} from '@mui/material'
import { Palette, LightMode, DarkMode } from '@mui/icons-material'

const ColorPaletteDemo = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const colorInfo = isDark ? [
    { name: 'Verdigris (Primary)', color: theme.palette.primary.main, hex: '#5bc0be' },
    { name: 'YInMn Blue (Secondary)', color: theme.palette.secondary.main, hex: '#3a506b' },
    { name: 'Fluorescent Cyan (Success)', color: theme.palette.success.main, hex: '#6fffe9' },
    { name: 'Oxford Blue (Background)', color: theme.palette.background.default, hex: '#0b132b' },
    { name: 'Space Cadet (Paper)', color: theme.palette.background.paper, hex: '#1c2541' },
  ] : [
    { name: 'Orange Pantone (Primary)', color: theme.palette.primary.main, hex: '#fb6107' },
    { name: 'Apple Green (Secondary)', color: theme.palette.secondary.main, hex: '#7cb518' },
    { name: 'Avocado (Success)', color: theme.palette.success.main, hex: '#5c8001' },
    { name: 'Xanthous (Warning)', color: theme.palette.warning.main, hex: '#fbb02d' },
    { name: 'Citrine (Info)', color: theme.palette.info.main, hex: '#f3de2c' },
  ]

  return (
    <Card sx={{ mb: 3, border: 2, borderColor: 'primary.main' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Palette sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Custom Color Palette Demo {isDark ? <DarkMode sx={{ ml: 1 }} /> : <LightMode sx={{ ml: 1 }} />}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {isDark ? 'Dark Mode - Kosmické a oceánské barvy' : 'Light Mode - Energické a přírodní barvy'}
        </Typography>

        <Grid container spacing={2}>
          {colorInfo.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.hex}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Button Showcase:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" size="small">
              Primary
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Secondary  
            </Button>
            <Button variant="contained" color="success" size="small">
              Success
            </Button>
            <Button variant="contained" color="warning" size="small">
              Warning
            </Button>
            <Button variant="contained" color="info" size="small">
              Info
            </Button>
            <Button variant="contained" color="error" size="small">
              Error
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Chip Showcase:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Primary" color="primary" size="small" />
            <Chip label="Secondary" color="secondary" size="small" />
            <Chip label="Success" color="success" size="small" />
            <Chip label="Warning" color="warning" size="small" />
            <Chip label="Info" color="info" size="small" />
            <Chip label="Error" color="error" size="small" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ColorPaletteDemo
