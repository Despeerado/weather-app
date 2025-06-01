import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { WeatherProvider } from './contexts/WeatherContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Layout from './components/Layout/Layout'
import WeatherApp from './components/WeatherApp/WeatherApp'

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <FavoritesProvider>
          <WeatherProvider>
            <Layout>
              <WeatherApp />
            </Layout>
          </WeatherProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
