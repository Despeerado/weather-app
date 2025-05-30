// Layout component using Bootstrap
import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container-fluid py-4">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
