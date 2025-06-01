// MUI theme type extensions

import { GlassmorphismVariant, GlassmorphismStyle, CustomPalette } from './index'

declare module '@mui/material/styles' {
  interface Palette {
    custom?: CustomPalette
  }

  interface PaletteOptions {
    custom?: Partial<CustomPalette>
  }

  interface Theme {
    glassmorphism: {
      createStyle: (variant: GlassmorphismVariant) => GlassmorphismStyle
    }
  }

  interface ThemeOptions {
    glassmorphism?: {
      createStyle?: (variant: GlassmorphismVariant) => GlassmorphismStyle
    }
  }
}

// Extend component props
declare module '@mui/material/Card' {
  interface CardProps {
    glassmorphism?: boolean
  }
}

declare module '@mui/material/Dialog' {
  interface DialogProps {
    glassmorphism?: boolean
  }
}
