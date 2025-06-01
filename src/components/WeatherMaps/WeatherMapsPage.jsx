// WeatherMapsPage.jsx - Standalone page for weather maps
import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Home, Map } from '@mui/icons-material';
import WeatherMapsContainer from './WeatherMapsContainer';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const WeatherMapsPage = () => {
  useDocumentTitle('Meteorologické mapy');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Glassmorphism styling
  const glassmorphismStyles = {
    background: isDarkMode 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)',
    padding: 3,
    marginBottom: 3,
  };

  return (
    <Box sx={{ 
      py: { xs: 1, sm: 2 },
      px: { xs: 1, sm: 2, md: 3 }, // Minimální padding pro obsah
      width: '100%',
      maxWidth: '100vw' // Zajistíme plnou šířku viewportu
    }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ 
          mb: 2,
          mx: { xs: 1, sm: 2 }, // Breadcrumbs s padding od okrajů
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary'
          }
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <Home sx={{ mr: 0.5, fontSize: 20 }} />
          Počasí
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          <Map sx={{ mr: 0.5, fontSize: 20 }} />
          Meteorologické mapy
        </Box>
      </Breadcrumbs>

      <Box sx={{
        ...glassmorphismStyles,
        mx: { xs: 0, sm: 1, md: 2 }, // Na mobilu bez margin, na větších zařízeních s margin
        px: { xs: 1, sm: 2, md: 3 }, // Padding uvnitř boxu
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Meteorologické mapy
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 3,
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Interaktivní meteorologické mapy s aktuálními údaji o počasí
        </Typography>

        <Box sx={{ 
          height: { xs: '60vh', sm: '70vh', md: '75vh' }, 
          minHeight: { xs: '400px', sm: '500px', md: '600px' },
          width: '100%' // Zajistíme plnou šířku kontejneru
        }}>
          <WeatherMapsContainer height="100%" showHeader={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherMapsPage;
