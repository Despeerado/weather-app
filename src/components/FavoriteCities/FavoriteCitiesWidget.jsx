// FavoriteCitiesWidget component using Bootstrap
import React, { useState } from 'react'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useWeather } from '../../contexts/WeatherContext'

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
    <div className="card weather-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="card-title mb-0">
          <i className="bi bi-star-fill text-warning me-2"></i>
          Oblíbená města ({favorites.length})
        </h6>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleClearAll}
            title="Vymazat vše"
          >
            <i className="bi bi-trash"></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? 'Skrýt' : 'Zobrazit'}
          >
            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="list-group-item d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-link text-start flex-grow-1 text-decoration-none p-0"
                  onClick={() => handleCityClick(favorite.name)}
                  title={`Zobrazit počasí pro ${favorite.name}`}
                >
                  <i className="bi bi-geo-alt me-2 text-muted"></i>
                  {favorite.name}
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => handleRemove(e, favorite.id)}
                  title="Odstranit z oblíbených"
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoriteCitiesWidget
