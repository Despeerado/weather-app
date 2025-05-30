// ForecastDisplay component using Bootstrap
import React from 'react'

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
    <div className="card weather-card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-calendar3 me-2"></i>
          5denní předpověď
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {daily.map((day, index) => {
            const mainWeather = getMainWeatherForDay(day.items)
            const isToday = index === 0
            
            return (
              <div 
                key={day.date.toDateString()} 
                className={`list-group-item d-flex align-items-center justify-content-between ${isToday ? 'bg-primary bg-opacity-10' : ''}`}
              >
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="me-3" style={{ minWidth: '80px' }}>
                    <strong className={isToday ? 'text-primary' : ''}>
                      {isToday ? 'Dnes' : formatDate(day.date)}
                    </strong>
                  </div>
                  
                  <div className="me-3">
                    <img 
                      src={`https://openweathermap.org/img/wn/${mainWeather.icon}.png`}
                      alt={mainWeather.description}
                      title={mainWeather.description}
                      className="weather-icon small"
                    />
                  </div>
                  
                  <div className="me-3 flex-grow-1">
                    <div className="weather-description small text-muted">
                      {mainWeather.description}
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div className="me-3 text-end">
                    <span className="fw-bold text-primary">{day.maxTemp}°</span>
                    <span className="text-muted small"> / {day.minTemp}°</span>
                  </div>
                  
                  <div className="d-flex gap-2 text-muted small">
                    <span title="Vlhkost">
                      <i className="bi bi-droplet"></i> {mainWeather.humidity}%
                    </span>
                    <span title="Vítr">
                      <i className="bi bi-wind"></i> {mainWeather.windSpeed}m/s
                    </span>
                    {mainWeather.pop > 0 && (
                      <span title="Pravděpodobnost srážek" className="text-info">
                        <i className="bi bi-umbrella"></i> {Math.round(mainWeather.pop * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ForecastDisplay
