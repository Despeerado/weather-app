// NotFoundPage.jsx - 404 page for invalid routes
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Home, Map } from '@mui/icons-material';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const NotFoundPage = () => {
  useDocumentTitle('Stránka nenalezena - 404');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
    padding: 4,
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={glassmorphismStyles} textAlign="center">
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2
          }}
        >
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Stránka nenalezena
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Omlouváme se, ale stránka kterou hledáte neexistuje.
          Možná byla přesunuta nebo odstraněna.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<Home />}
            sx={{ minWidth: 140 }}
          >
            Domů
          </Button>
          
          <Button
            variant="outlined"
            component={Link}
            to="/maps"
            startIcon={<Map />}
            sx={{ minWidth: 140 }}
          >
            Mapy
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
