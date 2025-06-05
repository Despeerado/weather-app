// Configuration for React app
export const CONFIG = {
  // OpenWeatherMap API configuration
  WEATHER_API_KEY:
    import.meta.env.VITE_OPENWEATHER_API_KEY ||
    import.meta.env.VITE_WEATHER_API_KEY ||
    "your-api-key-here",
  WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEOCODING_API_BASE_URL: "https://api.openweathermap.org/geo/1.0",
  WEATHER_MAPS_BASE_URL: "https://tile.openweathermap.org/map",

  // App configuration
  APP_NAME: "Počasník Weather App",
  APP_VERSION: "2.0.0",

  // Feature flags
  ENABLE_GEOLOCATION: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_PWA: true,
  ENABLE_WEATHER_MAPS: true,

  // UI configuration
  MAX_FAVORITE_CITIES: 10,
  AUTOCOMPLETE_MIN_CHARS: 2,
  AUTOCOMPLETE_DEBOUNCE_MS: 300,
  FORECAST_DAYS: 5,

  // Weather Maps configuration
  WEATHER_MAPS: {
    DEFAULT_ZOOM: 5,
    MIN_ZOOM: 1,
    MAX_ZOOM: 15,
    DEFAULT_OPACITY: 0.8,
    AVAILABLE_LAYERS: [
      { id: "clouds_new", name: "Oblačnost", icon: "☁️" },
      { id: "precipitation_new", name: "Srážky", icon: "🌧️" },
      { id: "pressure_new", name: "Tlak", icon: "🌡️" },
      { id: "wind_new", name: "Vítr", icon: "💨" },
      { id: "temp_new", name: "Teplota", icon: "🌡️" },
    ],
  },

  // Cache configuration
  WEATHER_CACHE_TTL: 10 * 60 * 1000, // 10 minutes
  CITIES_CACHE_TTL: 5 * 60 * 1000, // 5 minutes

  // API timeout
  API_TIMEOUT: 10000, // 10 seconds

  // Theme configuration
  DEFAULT_THEME: "light",
  THEME_STORAGE_KEY: "weather-app-theme",

  // LocalStorage keys
  STORAGE_KEYS: {
    FAVORITES: "favoriteCities",
    THEME: "theme",
    SEARCH_HISTORY: "searchHistory",
    LAST_SEARCH: "lastSearch",
  },

  // Development
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,

  // Error messages
  ERROR_MESSAGES: {
    NETWORK:
      "Nepodařilo se připojit k serveru. Zkontrolujte internetové připojení.",
    NOT_FOUND: "Město nebylo nalezeno. Zkontrolujte název a zkuste to znovu.",
    INVALID_API_KEY: "Neplatný API klíč. Kontaktujte správce aplikace.",
    RATE_LIMIT: "Příliš mnoho požadavků. Zkuste to prosím později.",
    SERVER_ERROR: "Chyba serveru. Zkuste to prosím později.",
    GENERIC: "Došlo k neočekávané chybě.",
    GEOLOCATION_DENIED: "Přístup k poloze byl zamítnut.",
    GEOLOCATION_UNAVAILABLE: "Poloha není dostupná.",
    GEOLOCATION_TIMEOUT: "Vypršel časový limit pro získání polohy.",
  },
};
