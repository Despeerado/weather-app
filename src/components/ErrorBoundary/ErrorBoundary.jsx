// ErrorBoundary.jsx - Error boundary component for routing errors
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Home, Refresh } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onReset }) => {
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
        <Typography variant="h4" component="h1" gutterBottom color="error">
          🚫 Něco se pokazilo
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Omlouváme se, došlo k neočekávané chybě. Zkuste stránku obnovit nebo se vraťte na hlavní stránku.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
            sx={{ minWidth: 140 }}
          >
            Obnovit stránku
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => window.location.href = '/'}
            sx={{ minWidth: 140 }}
          >
            Hlavní stránka
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorBoundary;
