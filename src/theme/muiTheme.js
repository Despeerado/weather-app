import { createTheme } from "@mui/material/styles";

// Custom color palette for light mode (optimized for accessibility)
const lightColors = {
  // Orange Pantone - Primary action color (slightly darker for better contrast)
  orangePantone: "#e55100",
  // Citrine - Warning/highlight color (much darker for readability)
  citrine: "#b8860b",
  // Apple Green - Success color (darker for better contrast)
  appleGreen: "#558b15",
  // Avocado - Secondary green (already good contrast)
  avocado: "#5c8001",
  // Xanthous - Secondary orange/warning (much darker for better contrast)
  xanthous: "#a0690f",
  // Supporting colors
  light: "#f8fafc",
  dark: "#1e293b",
  // Gradient background for light mode
  gradientBackground:
    "linear-gradient(45deg, rgba(142, 197, 252, 1.000) 0.000%, rgba(141, 211, 255, 1.000) 25.000%, rgba(161, 216, 255, 1.000) 50.000%, rgba(193, 210, 255, 1.000) 75.000%, rgba(224, 195, 255, 1.000) 100.000%)",
};

// Custom color palette for dark mode (optimized for accessibility)
const darkColors = {
  // Oxford Blue - Deep background
  oxfordBlue: "#0b132b",
  // Space Cadet - Secondary background (optimized for contrast)
  spaceCadet: "#3d566e",
  // YInMn Blue - Primary accent (brighter for better contrast)
  yinmnBlue: "#4a90e2",
  // Verdigris - Secondary accent (already good contrast)
  verdigris: "#5bc0be",
  // Fluorescent Cyan - Highlight/success (already excellent contrast)
  fluorescentCyan: "#6fffe9",
  // Supporting colors
  light: "#f8fafc",
  dark: "#1e293b",
  // Gradient background for dark mode
  gradientBackground: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
};

// Vytvoření MUI tématu s vašimi barvami
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.orangePantone, // Orange Pantone jako hlavní barva
      light: "#ff8a50", // Světlejší odstín
      dark: "#bf3f00", // Tmavší odstín
    },
    secondary: {
      main: lightColors.appleGreen, // Apple Green jako sekundární
      light: "#7cb518", // Světlejší zelená
      dark: "#3e5c00", // Tmavší zelená
    },
    success: {
      main: lightColors.avocado, // Avocado pro success stavy
      light: "#78a01a", // Světlejší avocado
      dark: "#4d6600", // Tmavší avocado
    },
    warning: {
      main: lightColors.xanthous, // Xanthous pro varování
      light: "#e6a84d", // Světlejší xanthous
      dark: "#996600", // Tmavší xanthous
    },
    info: {
      main: lightColors.citrine, // Citrine pro informace
      light: "#d4a017", // Světlejší citrine
      dark: "#8b6914", // Tmavší citrine
    },
    error: {
      main: "#ef4444", // Zachováváme červenou pro chyby
      light: "#ef5350",
      dark: "#d32f2f",
    },
    background: {
      default: lightColors.light, // Světlé pozadí
      paper: "#ffffff", // Bílé karty
    },
    text: {
      primary: lightColors.dark, // Tmavý text na světlém pozadí
      secondary: "#64748b", // Jemnější šedá pro sekundární text
    },
    // Custom colors section pro snadný přístup
    custom: {
      orangePantone: lightColors.orangePantone,
      citrine: lightColors.citrine,
      appleGreen: lightColors.appleGreen,
      avocado: lightColors.avocado,
      xanthous: lightColors.xanthous,
      // Gradient background
      gradientBackground: lightColors.gradientBackground,
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Odpovídá vašemu $border-radius-lg
  },
  components: {
    // Přizpůsobení komponent
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Vypne UPPER CASE text
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.verdigris, // Verdigris jako hlavní barva pro dark mode
      light: "#7dd3d1", // Světlejší verdigris
      dark: "#46a19f", // Tmavší verdigris
    },
    secondary: {
      main: darkColors.yinmnBlue, // YInMn Blue jako sekundární
      light: "#6ba4eb", // Světlejší modrá
      dark: "#357abd", // Tmavší modrá
    },
    success: {
      main: darkColors.fluorescentCyan, // Fluorescent Cyan pro success
      light: "#8fffed", // Světlejší cyan
      dark: "#4de6d1", // Tmavší cyan
    },
    warning: {
      main: "#fbb02d", // Zachováváme warm warning barvu
      light: "#fcc157",
      dark: "#e69600",
    },
    info: {
      main: darkColors.verdigris, // Verdigris také pro info
      light: "#7dd3d1",
      dark: "#46a19f",
    },
    error: {
      main: "#ef4444", // Zachováváme červenou pro chyby
      light: "#ef5350",
      dark: "#d32f2f",
    },
    background: {
      default: darkColors.oxfordBlue, // Oxford Blue jako hlavní pozadí
      paper: darkColors.spaceCadet, // Space Cadet pro karty a panely
    },
    text: {
      primary: darkColors.light, // Světlý text na tmavém pozadí
      secondary: "#94a3b8", // Jemnější šedá pro sekundární text
    },
    // Custom colors section pro snadný přístup v dark mode
    custom: {
      oxfordBlue: darkColors.oxfordBlue,
      spaceCadet: darkColors.spaceCadet,
      yinmnBlue: darkColors.yinmnBlue,
      verdigris: darkColors.verdigris,
      fluorescentCyan: darkColors.fluorescentCyan,
      // Gradient background
      gradientBackground: darkColors.gradientBackground,
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: darkColors.spaceCadet, // Space Cadet pro karty
          border: `1px solid ${darkColors.yinmnBlue}20`, // Jemný border s YInMn Blue
        },
      },
    },
  },
});

// Custom color utilities pro snadný přístup v komponentách
export const customColors = {
  light: lightColors,
  dark: darkColors,
};

// Helper funkce pro získání aktuálních custom barev na základě mode
export const getCustomColors = (mode) => {
  return mode === "dark" ? darkColors : lightColors;
};

// Extended palette augmentation pro TypeScript support (pokud by se použil)
// declare module '@mui/material/styles' {
//   interface Palette {
//     custom: {
//       orangePantone?: string;
//       citrine?: string;
//       appleGreen?: string;
//       avocado?: string;
//       xanthous?: string;
//       oxfordBlue?: string;
//       spaceCadet?: string;
//       yinmnBlue?: string;
//       verdigris?: string;
//       fluorescentCyan?: string;
//     };
//   }
//   interface PaletteOptions {
//     custom?: {
//       orangePantone?: string;
//       citrine?: string;
//       appleGreen?: string;
//       avocado?: string;
//       xanthous?: string;
//       oxfordBlue?: string;
//       spaceCadet?: string;
//       yinmnBlue?: string;
//       verdigris?: string;
//       fluorescentCyan?: string;
//     };
//   }
// }
