// Placeholder for SearchForm component
import React, { useState } from 'react'
import { useWeather } from '../../contexts/WeatherContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import CityAutocomplete from './CityAutocomplete'
import './SearchForm.scss'

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
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <CityAutocomplete
          value={query}
          onChange={setQuery}
          onSelect={(city) => {
            setQuery(city)
            searchWeather(city)
          }}
        />
        <button
          type="button"
          className={`btn-favorite ${isFavorite(query) ? 'active' : ''}`}
          onClick={handleAddToFavorites}
          disabled={!query.trim()}
          title="Přidat do oblíbených"
        >
          <i className="bi bi-star"></i>
        </button>
        <button
          type="submit"
          className="btn-search"
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
  )
}

export default SearchForm
