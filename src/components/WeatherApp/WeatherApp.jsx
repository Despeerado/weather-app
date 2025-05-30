// Main Weather Application component using Bootstrap
import React from 'react'
import { useWeather } from '../../contexts/WeatherContext'
import SearchForm from '../SearchForm/SearchForm'
import CurrentWeatherDisplay from '../WeatherDisplay/CurrentWeatherDisplay'
import ForecastDisplay from '../WeatherDisplay/ForecastDisplay'
import FavoriteCitiesWidget from '../FavoriteCities/FavoriteCitiesWidget'
import LoadingSpinner from '../UI/LoadingSpinner'
import ErrorMessage from '../UI/ErrorMessage'

const WeatherApp = () => {
  const { currentWeather, forecast, loading, error } = useWeather()

  return (
    <div className="weather-spacing">
      <div className="row g-4">
        {/* Search and Favorites */}
        <div className="col-12">
          <SearchForm />
        </div>
        <div className="col-12">
          <FavoriteCitiesWidget />
        </div>
        
        {/* Loading and Error States */}
        {loading && (
          <div className="col-12">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="col-12">
            <ErrorMessage message={error} />
          </div>
        )}
        
        {/* Weather Content */}
        {currentWeather && (
          <>
            <div className="col-12 col-lg-6">
              <CurrentWeatherDisplay data={currentWeather} />
            </div>
            {forecast && (
              <div className="col-12 col-lg-6">
                <ForecastDisplay data={forecast} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


export default WeatherApp
