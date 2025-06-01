// Footer component using Bootstrap
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-top mt-auto">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted mb-1">
              &copy; 2025 Počasník Weather App. Všechna práva vyhrazena.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-1">
              <i className="bi bi-cloud-sun me-1"></i>
              Powered by OpenWeatherMap API
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer
