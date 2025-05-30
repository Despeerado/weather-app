// FavoriteCitiesWidget component
import React, { useState } from 'react'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useWeather } from '../../contexts/WeatherContext'
import './FavoriteCitiesWidget.scss'

const FavoriteCitiesWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { searchWeather } = useWeather()

  const handleCityClick = async (cityName) => {
    setIsOpen(false)
    await searchWeather(cityName)
  }

  const handleRemove = (e, id) => {
    e.stopPropagation()
    removeFromFavorites(id)
  }

  const handleClearAll = () => {
    if (window.confirm('Opravdu chcete odstranit všechna oblíbená města?')) {
      clearFavorites()
      setIsOpen(false)
    }
  }

  if (favorites.length === 0) {
    return null
  }

  return (
    <div className="favorite-cities-widget">
      <button
        className="favorites-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Oblíbená města"
      >
        <i className="bi bi-star-fill"></i>
        <span>Oblíbená města ({favorites.length})</span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {isOpen && (
        <div className="favorites-dropdown">
          <div className="favorites-header">
            <h3>Oblíbená města</h3>
            <button
              className="clear-all-btn"
              onClick={handleClearAll}
              title="Vymazat vše"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>

          <ul className="favorites-list">
            {favorites.map((favorite) => (
              <li key={favorite.id} className="favorite-item">
                <button
                  className="favorite-city-btn"
                  onClick={() => handleCityClick(favorite.name)}
                  title={`Zobrazit počasí pro ${favorite.name}`}
                >
                  <span className="city-name">{favorite.name}</span>
                </button>
                <button
                  className="remove-btn"
                  onClick={(e) => handleRemove(e, favorite.id)}
                  title="Odstranit z oblíbených"
                >
                  <i className="bi bi-x"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FavoriteCitiesWidget
