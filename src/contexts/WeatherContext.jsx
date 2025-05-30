// Weather Context for managing weather data state
import React, { createContext, useContext, useReducer } from 'react'
import { weatherService } from '../services/weatherService'

const WeatherContext = createContext()

const initialState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  searchHistory: [],
}

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        currentWeather: action.payload.current,
        forecast: action.payload.forecast,
        error: null,
        searchHistory: [
          action.payload.current.name,
          ...state.searchHistory.filter(city => city !== action.payload.current.name)
        ].slice(0, 10)
      }
    case 'SEARCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'CLEAR_DATA':
      return {
        ...state,
        currentWeather: null,
        forecast: null,
        error: null,
      }
    default:
      return state
  }
}

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  const searchWeather = async (city) => {
    dispatch({ type: 'SEARCH_START' })
    
    try {
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ])
      
      dispatch({
        type: 'SEARCH_SUCCESS',
        payload: {
          current: currentWeather,
          forecast: forecast
        }
      })
    } catch (error) {
      dispatch({
        type: 'SEARCH_ERROR',
        payload: error.message || 'Nepodařilo se načíst data o počasí'
      })
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const clearData = () => {
    dispatch({ type: 'CLEAR_DATA' })
  }

  const value = {
    ...state,
    searchWeather,
    clearError,
    clearData,
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}
