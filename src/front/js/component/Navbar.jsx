import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/help-places">Lugares de ayuda</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/embassies">Embajadas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chat">Mensajeria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blog">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/gadgets">Gadgets</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chatbot">Chatbot</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact-list">Contact List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/immigration-requirements">Requisitos migratorios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/paypal-balance">Saldo paypal</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/freq-asked-questions">Preguntas Frecuentes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/emergency">Emergencia</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/help">Contactar Ayuda</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin-console">Consola manejo de datos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stats-and-reports">Estadisticas y reportes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboard-edition">Panel edicion dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/location-view">Vista ubicacion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar;