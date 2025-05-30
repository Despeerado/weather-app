# Počasník - Modern React Weather App

> Moderní React aplikace pro sledování počasí s pokročilým našeptávačem měst

## 🚀 Features

- **Modern React Architecture** - Built with React 18, Vite, and modern JavaScript
- **SCSS with Modern Syntax** - Uses latest Dart Sass with @use/@forward modules
- **Progressive Web App** - PWA ready with manifest and service worker support
- **Responsive Design** - Mobile-first approach with Bootstrap-inspired grid system
- **Dark/Light Theme** - Complete theme switching system
- **City Autocomplete** - Advanced city search with OpenWeatherMap geocoding
- **Favorite Cities** - Save and manage favorite locations
- **Real-time Weather** - Current weather and 5-day forecast
- **Optimized Performance** - Code splitting, lazy loading, and optimizations

## 🛠️ Tech Stack

- **Frontend**: React 18, JSX
- **Build Tool**: Vite 6.3.5
- **Styling**: SCSS (Dart Sass 1.89.0) with modern @use syntax
- **HTTP Client**: Axios
- **Icons**: Lucide React, Bootstrap Icons
- **Weather API**: OpenWeatherMap API
- **Package Manager**: npm

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd pocasnik

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your OpenWeatherMap API key to .env.local
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## 🔑 API Setup

1. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add it to your `.env.local` file:
   ```bash
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # App layout components
│   ├── WeatherApp/     # Main weather application
│   ├── WeatherDisplay/ # Weather display components
│   ├── SearchForm/     # City search functionality
│   ├── ThemeSwitcher/  # Theme switching component
│   └── UI/             # Reusable UI components
├── assets/styles/      # SCSS stylesheets
│   ├── abstracts/      # SCSS variables, mixins, functions
│   ├── base/           # Base styles and typography
│   ├── components/     # Component-specific styles
│   ├── layout/         # Layout-specific styles
│   └── themes/         # Theme definitions
├── services/           # API services
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── config/             # App configuration
```

## 🎨 Styling Architecture

The project uses modern SCSS with:
- **@use/@forward modules** instead of deprecated @import
- **Modern Sass functions** (`math.div()`, `map.get()`, `math.percentage()`)
- **Responsive mixins** for breakpoint management
- **CSS custom properties** for theme switching
- **Component-scoped styles** following BEM methodology

## 🌍 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Features

- Installable web app
- Offline-first approach
- App-like experience
- Custom app icon and splash screen

## 🔧 Configuration

Key configuration options in `src/config/config.js`:

```javascript
export const CONFIG = {
  WEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  WEATHER_API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEOCODING_API_BASE_URL: 'https://api.openweathermap.org/geo/1.0',
  MAX_FAVORITE_CITIES: 10,
  DEFAULT_UNITS: 'metric',
  DEFAULT_LANGUAGE: 'cs'
};
```

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The `dist/` folder contains all static files ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 🐛 Troubleshooting

### API Issues
- Ensure your API key is valid and not expired
- Check that the API key is properly set in `.env.local`
- Verify network connectivity

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility (16+)

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using modern web technologies**