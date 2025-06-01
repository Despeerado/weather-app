import { createTheme } from "@mui/material/styles";

// Moderní elegantní paleta pro světlý režim
const lightColors = {
  // Hlavní modrá - modern sky blue s jasností
  primaryBlue: "#2563eb",
  // Elegantní fialová - pro akcenty a důležité elementy
  accentPurple: "#7c3aed",
  // Sofistikovaná zelená - pro úspěchy a pozitivní stavy
  modernGreen: "#059669",
  // Jemná oranžová - pro varování, ale elegantnější
  softOrange: "#ea580c",
  // Stylová růžová - pro speciální akcenty
  elegantRose: "#e11d48",
  // Podpůrné barvy
  light: "#fafafa",
  dark: "#0f172a",
  lightGray: "#f1f5f9",
  // Moderní gradient - od světle modré přes fialovou k růžové
  gradientBackground:
    "linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 25%, #fdf2f8 50%, #ecfdf5 75%, #f0f9ff 100%)",
};

// Sofistikovaná paleta pro tmavý režim
const darkColors = {
  // Hluboká tmavě modrá - elegantní pozadí
  deepNavy: "#0c1426",
  // Středně tmavá s modrofialovým nádechem - pro karty a panely
  slateBlue: "#1e293b",
  // Jasná kybernetická modrá - hlavní akcent
  cyberBlue: "#3b82f6",
  // Elegantní tyrkysová - sekundární akcent
  modernTeal: "#06b6d4",
  // Zářivě fialová - pro speciální prvky
  vibrantPurple: "#8b5cf6",
  // Soft mint - pro úspěchy
  softMint: "#10b981",
  // Podpůrné barvy
  light: "#f8fafc",
  dark: "#020617",
  // Tmavý gradient - od hluboké modré přes fialovou k tyrkysové
  gradientBackground:
    "linear-gradient(135deg, #0c1426 0%, #1a1b3a 25%, #2d1b69 50%, #1e3a8a 75%, #155e75 100%)",
};

// Vytvoření MUI tématu s vašimi barvami
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primaryBlue, // Moderní modrá jako hlavní barva
      light: "#60a5fa", // Světlejší modrá
      dark: "#1d4ed8", // Tmavší modrá
    },
    secondary: {
      main: lightColors.accentPurple, // Elegantní fialová jako sekundární
      light: "#a855f7", // Světlejší fialová
      dark: "#6d28d9", // Tmavší fialová
    },
    success: {
      main: lightColors.modernGreen, // Moderní zelená pro úspěchy
      light: "#34d399", // Světlejší zelená
      dark: "#047857", // Tmavší zelená
    },
    warning: {
      main: lightColors.softOrange, // Jemná oranžová pro varování
      light: "#fb923c", // Světlejší oranžová
      dark: "#c2410c", // Tmavší oranžová
    },
    info: {
      main: lightColors.primaryBlue, // Modrá také pro info
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    error: {
      main: lightColors.elegantRose, // Stylová růžová pro chyby
      light: "#f43f5e",
      dark: "#be123c",
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
      primaryBlue: lightColors.primaryBlue,
      accentPurple: lightColors.accentPurple,
      modernGreen: lightColors.modernGreen,
      softOrange: lightColors.softOrange,
      elegantRose: lightColors.elegantRose,
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
      fontSize: "clamp(2rem, 4vw, 3rem)", // Responsive font sizing
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16, // Více zaoblené prvky pro modernější vzhled
  },
  components: {
    // Přizpůsobení komponent
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Vypne UPPER CASE text
          borderRadius: 12, // Zaoblenější tlačítka
          fontWeight: 600, // Boldnější text
          padding: "8px 24px", // Více paddingu
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-1px)",
            transition: "all 0.2s ease-in-out",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Zaoblenější rohy
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)", // Jemnější stíny
          border: `1px solid ${lightColors.primaryBlue}08`, // Velmi jemný border
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 8px rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(8px)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.cyberBlue, // Kybernetická modrá jako hlavní barva
      light: "#60a5fa", // Světlejší modrá
      dark: "#1d4ed8", // Tmavší modrá
    },
    secondary: {
      main: darkColors.modernTeal, // Moderní tyrkysová jako sekundární
      light: "#22d3ee", // Světlejší tyrkysová
      dark: "#0891b2", // Tmavší tyrkysová
    },
    success: {
      main: darkColors.softMint, // Soft mint pro úspěchy
      light: "#34d399", // Světlejší mint
      dark: "#059669", // Tmavší zelená
    },
    warning: {
      main: "#f59e0b", // Elegantní zlatavá pro varování
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: darkColors.vibrantPurple, // Zářivá fialová pro info
      light: "#a78bfa", // Světlejší fialová
      dark: "#7c3aed", // Tmavší fialová
    },
    error: {
      main: "#ef4444", // Červená pro chyby
      light: "#f87171",
      dark: "#dc2626",
    },
    background: {
      default: darkColors.deepNavy, // Hluboká tmavě modrá jako pozadí
      paper: darkColors.slateBlue, // Slate blue pro karty a panely
    },
    text: {
      primary: darkColors.light, // Světlý text na tmavém pozadí
      secondary: "#94a3b8", // Jemnější šedá pro sekundární text
    },
    // Custom colors section pro snadný přístup v dark mode
    custom: {
      deepNavy: darkColors.deepNavy,
      slateBlue: darkColors.slateBlue,
      cyberBlue: darkColors.cyberBlue,
      modernTeal: darkColors.modernTeal,
      vibrantPurple: darkColors.vibrantPurple,
      softMint: darkColors.softMint,
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
      fontSize: "clamp(2rem, 4vw, 3rem)", // Responsive font sizing
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16, // Více zaoblené prvky pro modernější vzhled
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12, // Zaoblenější tlačítka
          fontWeight: 600, // Boldnější text
          padding: "8px 24px", // Více paddingu
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
            transform: "translateY(-1px)",
            transition: "all 0.2s ease-in-out",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Zaoblenější rohy pro modernější vzhled
          backgroundColor: darkColors.slateBlue, // Slate blue pro karty
          border: `1px solid ${darkColors.cyberBlue}15`, // Jemný border s cyber blue
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)", // Jemnější stín
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-2px)",
            border: `1px solid ${darkColors.cyberBlue}25`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
          backgroundColor: darkColors.slateBlue,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(8px)",
          backgroundColor: `${darkColors.deepNavy}95`,
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
//       // Light mode colors
//       primaryBlue?: string;
//       accentPurple?: string;
//       modernGreen?: string;
//       softOrange?: string;
//       elegantRose?: string;
//       // Dark mode colors
//       deepNavy?: string;
//       slateBlue?: string;
//       cyberBlue?: string;
//       modernTeal?: string;
//       vibrantPurple?: string;
//       softMint?: string;
//       // Gradient
//       gradientBackground?: string;
//     };
//   }
//   interface PaletteOptions {
//     custom?: {
//       // Light mode colors
//       primaryBlue?: string;
//       accentPurple?: string;
//       modernGreen?: string;
//       softOrange?: string;
//       elegantRose?: string;
//       // Dark mode colors
//       deepNavy?: string;
//       slateBlue?: string;
//       cyberBlue?: string;
//       modernTeal?: string;
//       vibrantPurple?: string;
//       softMint?: string;
//       // Gradient
//       gradientBackground?: string;
//     };
//   }
// }
