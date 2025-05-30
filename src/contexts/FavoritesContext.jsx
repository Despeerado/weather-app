// Favorites Context for managing favorite cities
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FavoritesContext = createContext()

const initialState = {
  favorites: [],
  maxFavorites: 10,
}

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      }
    case 'ADD_FAVORITE':
      if (state.favorites.length >= state.maxFavorites) {
        return state // Don't add if at max capacity
      }
      if (state.favorites.some(fav => fav.name.toLowerCase() === action.payload.name.toLowerCase())) {
        return state // Don't add duplicates
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      }
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
      }
    case 'REORDER_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      }
    default:
      return state
  }
}

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('favoriteCities')
      if (saved) {
        const favorites = JSON.parse(saved)
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites })
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
    }
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }, [state.favorites])

  const addToFavorites = (cityName) => {
    const favorite = {
      id: Date.now(),
      name: cityName,
      addedAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_FAVORITE', payload: favorite })
  }

  const removeFromFavorites = (id) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id })
  }

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' })
  }

  const isFavorite = (cityName) => {
    return state.favorites.some(fav => 
      fav.name.toLowerCase() === cityName.toLowerCase()
    )
  }

  const reorderFavorites = (newOrder) => {
    dispatch({ type: 'REORDER_FAVORITES', payload: newOrder })
  }

  const value = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    reorderFavorites,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
