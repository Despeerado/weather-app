// Placeholder for Header component
import React from 'react'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'
import './Header.scss'

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="app-title">
          <i className="bi bi-cloud-sun"></i>
          Počasník
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default Header
