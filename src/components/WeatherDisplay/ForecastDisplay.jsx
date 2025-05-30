// Placeholder for ForecastDisplay component
import React from 'react'
import './ForecastDisplay.scss'

const ForecastDisplay = ({ data }) => {
  if (!data || !data.daily) return null

  const { daily } = data

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date)
  }

  const getMainWeatherForDay = (items) => {
    // Find the item closest to noon (12:00)
    const noonItem = items.reduce((closest, item) => {
      const itemHour = item.dt.getHours()
      const closestHour = closest.dt.getHours()
      const noonDiff = Math.abs(itemHour - 12)
      const closestNoonDiff = Math.abs(closestHour - 12)
      
      return noonDiff < closestNoonDiff ? item : closest
    })
    
    return noonItem
  }

  return (
    <div className="forecast-display">
      <h3 className="forecast-title">5denní předpověď</h3>
      
      <div className="forecast-list">
        {daily.map((day, index) => {
          const mainWeather = getMainWeatherForDay(day.items)
          const isToday = index === 0
          
          return (
            <div key={day.date.toDateString()} className={`forecast-item ${isToday ? 'today' : ''}`}>
              <div className="day-info">
                <span className="day-name">
                  {isToday ? 'Dnes' : formatDate(day.date)}
                </span>
              </div>
              
              <div className="weather-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${mainWeather.icon}.png`}
                  alt={mainWeather.description}
                  title={mainWeather.description}
                />
              </div>
              
              <div className="description">
                {mainWeather.description}
              </div>
              
              <div className="temperature-range">
                <span className="max-temp">{day.maxTemp}°</span>
                <span className="min-temp">{day.minTemp}°</span>
              </div>
              
              <div className="additional-info">
                <div className="info-item">
                  <i className="bi bi-droplet"></i>
                  <span>{mainWeather.humidity}%</span>
                </div>
                <div className="info-item">
                  <i className="bi bi-wind"></i>
                  <span>{mainWeather.windSpeed} m/s</span>
                </div>
                {mainWeather.pop > 0 && (
                  <div className="info-item precipitation">
                    <i className="bi bi-umbrella"></i>
                    <span>{Math.round(mainWeather.pop * 100)}%</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastDisplay
