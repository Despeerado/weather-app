// ThemeSwitcher component using Bootstrap
import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      className={`btn btn-outline-secondary theme-switcher rounded-pill`}
      onClick={toggleTheme}
      title={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}
      aria-label={`Přepnout na ${isDark ? 'světlý' : 'tmavý'} režim`}
    >
      <i className={`bi bi-${isDark ? 'moon-stars' : 'sun'}`}></i>
    </button>
  )
}

export default ThemeSwitcher
