// Header component using Bootstrap
import React from 'react'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-cloud-sun me-2"></i>
          Počasník
        </a>
        
        <div className="d-flex align-items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}

export default Header
