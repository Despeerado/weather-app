# 📊 Weather Charts Components

Sada React komponent pro vizualizaci počasních dat s Chart.js a glassmorphism designem.

## 🚀 Rychlý start

```jsx
import WeatherChartsContainer from './Charts/WeatherChartsContainer'

// Použití v aplikaci
<WeatherChartsContainer 
  weatherData={currentWeather} 
  forecastData={forecast} 
/>
```

## 📋 Komponenty

### 🌡️ TemperatureTrend
- **Data:** 5-denní min/max teploty
- **Typ:** Line chart s gradient fill
- **Features:** Glassmorphism, responsive tooltips

### 💧 PrecipitationChart  
- **Data:** 24h pravděpodobnost srážek
- **Typ:** Bar chart s dynamickou opacity
- **Features:** 3hodinové intervaly, percentage zobrazení

### 💨 WeatherMetricsChart
- **Data:** Vlhkost a rychlost větru
- **Typ:** Multi-axis line chart
- **Features:** Dual Y-axis, různé barvy linií

### 📊 WeatherChartsContainer
- **Účel:** Layout a organizace grafů
- **Features:** Responsive grid, conditional rendering

## 🎨 Styling

Všechny komponenty používají:
- ✅ Glassmorphism efekty z `theme/glassmorphism.ts`
- ✅ Material-UI theme colors
- ✅ Dark/Light mode support
- ✅ Custom tooltips s ikonami
- ✅ Smooth animations

## 📱 Responsive

```jsx
// Desktop (lg+)
┌─────────────┬─────────────┐
│ Temperature │ Precipitation│
├─────────────┴─────────────┤
│     Weather Metrics       │
└───────────────────────────┘

// Mobile (xs)
┌───────────────────────────┐
│       Temperature         │
├───────────────────────────┤
│      Precipitation        │
├───────────────────────────┤
│     Weather Metrics       │
└───────────────────────────┘
```

## 🔧 Závislosti

```json
{
  "chart.js": "^4.x",
  "react-chartjs-2": "^5.x",
  "chartjs-adapter-date-fns": "^3.x",
  "date-fns": "^2.x"
}
```

## 📊 Data Format

Komponenty očekávají data ve formátu z `weatherService.js`:

```typescript
// forecastData structure
{
  daily: Array<{
    date: Date,
    maxTemp: number,
    minTemp: number
  }>,
  list: Array<{
    dt: Date,
    pop: number,        // 0-1 probability
    humidity: number,   // percentage
    windSpeed: number   // m/s
  }>
}
```
