// Rychlý test - ověření, že aplikace používá custom barvy
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Stack } from '@mui/material';

const QuickColorTest = () => {
  const theme = useTheme();
  
  // Ověř, že máme přístup k custom barvám
  const customColors = theme.palette.custom || {};
  const isDarkMode = theme.palette.mode === 'dark';
  
  console.log('🎨 Current theme mode:', theme.palette.mode);
  console.log('🎨 Custom colors available:', Object.keys(customColors));
  console.log('🎨 Primary color:', theme.palette.primary.main);
  console.log('🎨 Secondary color:', theme.palette.secondary.main);
  
  return (
    <Box sx={{ p: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        🧪 Quick Color Test
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Mode: {isDarkMode ? '🌙 Dark' : '🌞 Light'}
      </Typography>
      
      <Stack spacing={1}>
        <Button variant="contained" color="primary" size="small">
          Primary ({theme.palette.primary.main})
        </Button>
        
        <Button variant="contained" color="secondary" size="small">
          Secondary ({theme.palette.secondary.main})
        </Button>
        
        <Button variant="contained" color="success" size="small">
          Success ({theme.palette.success.main})
        </Button>
        
        <Button variant="contained" color="warning" size="small">
          Warning ({theme.palette.warning.main})
        </Button>
        
        <Button variant="contained" color="info" size="small">
          Info ({theme.palette.info.main})
        </Button>
      </Stack>
      
      {Object.keys(customColors).length > 0 && (
        <>
          <Typography variant="caption" color="success.main" sx={{ mt: 2, display: 'block' }}>
            ✅ Custom colors loaded: {Object.keys(customColors).length} colors
          </Typography>
          
          {/* Gradient Preview */}
          <Box
            sx={{
              mt: 2,
              height: 60,
              borderRadius: 1,
              background: theme.palette.custom?.gradientBackground || 'transparent',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ 
              color: isDarkMode ? 'white' : 'rgba(0,0,0,0.7)',
              fontWeight: 'bold',
            }}>
              Gradient Background
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default QuickColorTest;
