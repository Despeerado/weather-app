// Placeholder for CityAutocomplete component
import React, { useState, useEffect, useRef } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { geocodingService } from '../../services/geocodingService'
import './CityAutocomplete.scss'

const CityAutocomplete = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [debouncedValue])

  const fetchSuggestions = async (query) => {
    setLoading(true)
    try {
      const cities = await geocodingService.searchCities(query)
      setSuggestions(cities.slice(0, 5))
      setIsOpen(cities.length > 0)
    } catch (error) {
      console.error('Error fetching city suggestions:', error)
      setSuggestions([])
      setIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (city) => {
    const cityName = `${city.name}, ${city.country}`
    onChange(cityName)
    onSelect(cityName)
    setIsOpen(false)
    setSuggestions([])
  }

  return (
    <div className="city-autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Zadejte název města..."
        className="city-input"
        autoComplete="off"
      />
      
      {loading && (
        <div className="autocomplete-loading">
          <i className="bi bi-arrow-clockwise spin"></i>
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul ref={listRef} className="suggestions-list">
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${city.country}-${index}`}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              <div className="city-name">{city.name}</div>
              <div className="city-details">
                {city.state && `${city.state}, `}{city.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CityAutocomplete
