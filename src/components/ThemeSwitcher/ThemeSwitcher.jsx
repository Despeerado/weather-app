// ThemeSwitcher component
import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import './ThemeSwitcher.scss'

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      className={`theme-switcher ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      title={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}
      aria-label={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}
    >
      <div className="theme-switcher-track">
        <div className="theme-switcher-thumb">
          <i className={`bi bi-${isDark ? 'moon-stars' : 'sun'}`}></i>
        </div>
      </div>
    </button>
  )
}

export default ThemeSwitcher
