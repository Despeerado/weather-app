// Main Weather Application component
import React from 'react'
import { useWeather } from '../../contexts/WeatherContext'
import SearchForm from '../SearchForm/SearchForm'
import CurrentWeatherDisplay from '../WeatherDisplay/CurrentWeatherDisplay'
import ForecastDisplay from '../WeatherDisplay/ForecastDisplay'
import FavoriteCitiesWidget from '../FavoriteCities/FavoriteCitiesWidget'
import LoadingSpinner from '../UI/LoadingSpinner'
import ErrorMessage from '../UI/ErrorMessage'
import './WeatherApp.scss'

const WeatherApp = () => {
  const { currentWeather, forecast, loading, error } = useWeather()

  return (
    <div className="weather-app">
      <div className="container">
        <SearchForm />
        <FavoriteCitiesWidget />
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {currentWeather && (
          <div className="weather-content">
            <CurrentWeatherDisplay data={currentWeather} />
            {forecast && <ForecastDisplay data={forecast} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherApp
