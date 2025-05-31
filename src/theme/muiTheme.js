import { createTheme } from "@mui/material/styles";

// Vaše existující barevná paleta z Bootstrap variables
const colors = {
  primary: "#1b8ef2",
  secondary: "#38bdf2",
  info: "#1ba0f2",
  warning: "#f2a516",
  success: "#10b981",
  error: "#ef4444",
  accent: "#38d0f2",
  light: "#f8fafc",
  dark: "#1e293b",
};

// Vytvoření MUI tématu s vašimi barvami
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: "#4da6f5",
      dark: "#1565c0",
    },
    secondary: {
      main: colors.secondary,
      light: "#5cc9f5",
      dark: "#0277bd",
    },
    info: {
      main: colors.info,
      light: "#42a5f5",
      dark: "#0d47a1",
    },
    warning: {
      main: colors.warning,
      light: "#ffb74d",
      dark: "#f57c00",
    },
    success: {
      main: colors.success,
      light: "#4caf50",
      dark: "#388e3c",
    },
    error: {
      main: colors.error,
      light: "#ef5350",
      dark: "#d32f2f",
    },
    background: {
      default: colors.light,
      paper: "#ffffff",
    },
    text: {
      primary: colors.dark,
      secondary: "#64748b",
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
      main: colors.primary,
      light: "#4da6f5",
      dark: "#1565c0",
    },
    secondary: {
      main: colors.secondary,
      light: "#5cc9f5",
      dark: "#0277bd",
    },
    info: {
      main: colors.info,
      light: "#42a5f5",
      dark: "#0d47a1",
    },
    warning: {
      main: colors.warning,
      light: "#ffb74d",
      dark: "#f57c00",
    },
    success: {
      main: colors.success,
      light: "#4caf50",
      dark: "#388e3c",
    },
    error: {
      main: colors.error,
      light: "#ef5350",
      dark: "#d32f2f",
    },
    background: {
      default: colors.dark,
      paper: "#2a3441", // Mírně světlejší než dark
    },
    text: {
      primary: colors.light,
      secondary: "#94a3b8",
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
          backgroundColor: "#2a3441",
        },
      },
    },
  },
});
