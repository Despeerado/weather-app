import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WeatherProvider } from './contexts/WeatherContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Layout from './components/Layout/Layout'
import HomePage from './components/Pages/HomePage'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

// Lazy load components for better performance
const WeatherMapsPage = React.lazy(() => import('./components/WeatherMaps/WeatherMapsPage'))
const NotFoundPage = React.lazy(() => import('./components/Pages/NotFoundPage'))

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <FavoritesProvider>
            <WeatherProvider>
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/maps" element={<WeatherMapsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </Layout>
            </WeatherProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
