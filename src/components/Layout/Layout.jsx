// Placeholder for Layout component
import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
