// SearchForm component using Bootstrap
import React, { useState } from 'react'
import { useWeather } from '../../contexts/WeatherContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import CityAutocomplete from './CityAutocomplete'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const { searchWeather, loading } = useWeather()
  const { addToFavorites, isFavorite } = useFavorites()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (query.trim()) {
      await searchWeather(query.trim())
    }
  }

  const handleAddToFavorites = () => {
    if (query.trim()) {
      addToFavorites(query.trim())
    }
  }

  return (
    <div className="card weather-card">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="bi bi-search me-2"></i>
          Vyhledat město
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="input-group search-form">
            <CityAutocomplete
              value={query}
              onChange={setQuery}
              onSelect={(city) => {
                setQuery(city)
                searchWeather(city)
              }}
              className="form-control"
            />
            <button
              type="button"
              className={`btn btn-outline-warning ${isFavorite(query) ? 'active' : ''}`}
              onClick={handleAddToFavorites}
              disabled={!query.trim()}
              title="Přidat do oblíbených"
            >
              <i className="bi bi-star"></i>
            </button>
            <button
              type="submit"
              className="btn btn-weather"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <i className="bi bi-arrow-clockwise spin"></i>
              ) : (
                <i className="bi bi-search"></i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default SearchForm
