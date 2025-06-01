import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import {
  WbSunny,
  Cloud,
  Umbrella,
  AcUnit,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

const MuiDemoCard = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Aktuální počasí
      </Typography>
      
      <Grid container spacing={3}>
        {/* Ukázková karta počasí */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WbSunny color="warning" sx={{ mr: 1, fontSize: 30 }} />
                <Typography variant="h5" component="div">
                  Praha
                </Typography>
                <IconButton sx={{ ml: 'auto' }}>
                  <FavoriteBorder />
                </IconButton>
              </Box>
              
              <Typography variant="h2" component="div" color="primary" sx={{ mb: 1 }}>
                24°C
              </Typography>
              
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Slunečno
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant="contained" size="small">
                  Detaily
                </Button>
                <Button variant="outlined" size="small">
                  Předpověď
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Ukázka ikonek počasí */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ikony počasí
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <WbSunny color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="caption" display="block">
                  Slunečno
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Cloud color="info" sx={{ fontSize: 40 }} />
                <Typography variant="caption" display="block">
                  Oblačno
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Umbrella color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="caption" display="block">
                  Déšť
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <AcUnit color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="caption" display="block">
                  Sníh
                </Typography>
              </Box>
            </Box>

            <Button 
              variant="contained" 
              onClick={toggleTheme}
              fullWidth
            >
              Přepnout na {isDark ? 'světlý' : 'tmavý'} režim
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MuiDemoCard;
