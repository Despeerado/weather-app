// Global type definitions for the weather application

export interface WeatherData {
  name: string
  country: string
  temperature: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  visibility: number
  sunrise: Date
  sunset: Date
}

export interface ForecastItem {
  dt: Date
  temperature: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  windDirection: number
  pop: number // Probability of precipitation
}

export interface DailyForecast {
  date: Date
  maxTemp: number
  minTemp: number
  items: ForecastItem[]
}

export interface ForecastData {
  daily: DailyForecast[]
}

export interface CityData {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export interface FavoriteCity {
  id: string
  name: string
  addedAt: Date
}

export interface ApiError {
  message: string
  code?: string | number
  details?: any
}

// Theme related types
export type ThemeMode = 'light' | 'dark'

export interface CustomPalette {
  orangePantone: string
  appleGreen: string
  avocado: string
  xanthous: string
  citrine: string
  verdigris: string
  yinmnBlue: string
  fluorescentCyan: string
  oxfordBlue: string
  spaceCadet: string
  gradientBackground: string
}

// Glassmorphism types
export type GlassmorphismVariant = 'default' | 'header' | 'footer' | 'dialog' | 'card'

export interface GlassmorphismStyle {
  background: string
  backdropFilter: string
  WebkitBackdropFilter: string
  border: string
  borderRadius?: string | number | object
  boxShadow: string
}

// Component prop types
export interface WeatherDisplayProps {
  data: WeatherData | null
}

export interface ForecastDisplayProps {
  data: ForecastData | null
}

export interface CityAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (city: string) => void
}

export interface ErrorMessageProps {
  message: string
  type?: 'error' | 'warning' | 'info'
  onRetry?: () => void
  onDismiss?: () => void
  title?: string
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

// Context types
export interface WeatherContextValue {
  currentWeather: WeatherData | null
  forecast: ForecastData | null
  loading: boolean
  error: string | null
  searchWeather: (city: string) => Promise<void>
  clearError: () => void
}

export interface FavoritesContextValue {
  favorites: FavoriteCity[]
  addToFavorites: (cityName: string) => void
  removeFromFavorites: (id: string) => void
  clearFavorites: () => void
  isFavorite: (cityName: string) => boolean
}

export interface ThemeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
}

// Service types
export interface WeatherServiceConfig {
  apiKey: string
  baseUrl: string
}

export interface GeocodingServiceConfig {
  apiKey: string
  baseUrl: string
}
