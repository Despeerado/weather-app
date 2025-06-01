// Glassmorphism utility functions with TypeScript support

import { Theme } from '@mui/material/styles'
import { GlassmorphismVariant, GlassmorphismStyle } from '../types'

interface GlassmorphismConfig {
  light: {
    background: string
    border: string
    boxShadow: string
  }
  dark: {
    background: string
    border: string
    boxShadow: string
  }
}

const glassmorphismVariants: Record<GlassmorphismVariant, GlassmorphismConfig> = {
  default: {
    light: {
      background: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  },
  header: {
    light: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }
  },
  footer: {
    light: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.05)'
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.2)'
    }
  },
  dialog: {
    light: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(0, 0, 0, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
    },
    dark: {
      background: 'rgba(45, 55, 72, 0.95)',
      border: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
    }
  },
  card: {
    light: {
      background: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  }
}

export const createGlassmorphismStyle = (
  theme: Theme, 
  variant: GlassmorphismVariant = 'default'
): GlassmorphismStyle => {
  const isDark = theme.palette.mode === 'dark'
  const config = glassmorphismVariants[variant]
  const modeConfig = isDark ? config.dark : config.light

  return {
    background: modeConfig.background,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${modeConfig.border}`,
    boxShadow: modeConfig.boxShadow
  }
}

export const createHoverGlassmorphismStyle = (
  theme: Theme,
  variant: GlassmorphismVariant = 'default'
): Partial<GlassmorphismStyle> => {
  const isDark = theme.palette.mode === 'dark'
  const config = glassmorphismVariants[variant]
  
  // Extrahujeme base opacity z konfigurace a zvýšíme ji o 50%
  const baseConfig = isDark ? config.dark : config.light
  const baseOpacityMatch = baseConfig.background.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/)
  const baseOpacity = baseOpacityMatch ? parseFloat(baseOpacityMatch[1]) : (isDark ? 0.08 : 0.25)
  const adjustedOpacity = Math.min(baseOpacity * 1.5, 0.5)
  
  return {
    background: isDark 
      ? `rgba(255, 255, 255, ${adjustedOpacity})` 
      : `rgba(255, 255, 255, ${adjustedOpacity})`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
  }
}

// Helper pro rychlé aplikování glassmorphism stylů
export const useGlassmorphism = (theme: Theme, variant: GlassmorphismVariant = 'default') => {
  return {
    ...createGlassmorphismStyle(theme, variant),
    '&:hover': createHoverGlassmorphismStyle(theme, variant)
  }
}
