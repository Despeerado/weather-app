// Placeholder for CurrentWeatherDisplay component
import React from 'react'
import './CurrentWeatherDisplay.scss'

const CurrentWeatherDisplay = ({ data }) => {
  if (!data) return null

  const {
    name,
    country,
    temperature,
    feelsLike,
    description,
    icon,
    humidity,
    pressure,
    windSpeed,
    windDirection,
    visibility,
    sunrise,
    sunset
  } = data

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getWindDirection = (degrees) => {
    const directions = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2 className="location">{name}, {country}</h2>
        <div className="main-info">
          <div className="temperature-section">
            <span className="temperature">{temperature}°C</span>
            <div className="weather-icon">
              <img 
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
                alt={description}
                title={description}
              />
            </div>
          </div>
          <div className="description-section">
            <p className="description">{description}</p>
            <p className="feels-like">Pocitově {feelsLike}°C</p>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <i className="bi bi-droplet"></i>
          <span className="label">Vlhkost</span>
          <span className="value">{humidity}%</span>
        </div>
        
        <div className="detail-item">
          <i className="bi bi-speedometer2"></i>
          <span className="label">Tlak</span>
          <span className="value">{pressure} hPa</span>
        </div>
        
        <div className="detail-item">
          <i className="bi bi-wind"></i>
          <span className="label">Vítr</span>
          <span className="value">{windSpeed} m/s {getWindDirection(windDirection)}</span>
        </div>
        
        <div className="detail-item">
          <i className="bi bi-eye"></i>
          <span className="label">Viditelnost</span>
          <span className="value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        
        <div className="detail-item">
          <i className="bi bi-sunrise"></i>
          <span className="label">Východ slunce</span>
          <span className="value">{formatTime(sunrise)}</span>
        </div>
        
        <div className="detail-item">
          <i className="bi bi-sunset"></i>
          <span className="label">Západ slunce</span>
          <span className="value">{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherDisplay
