import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";




const Home = () => {
  const { store, actions } = useContext(Context);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada por este navegador.");
      return;
    }

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitud: latitude, longitud: longitude });
          console.log("ubiv", location);
        },
        (error) => {
          setError("Error al obtener la ubicación: ", error);
        }
      );
    };

    getLocation();
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div>
        <h2>Ubicación del Usuario</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {location ? (
          <p>
            Latitud: {location.latitud}, Longitud: {location.longitud}
            <h2>AHUEVOOOO</h2>
          </p>

        ) : (
          <p>Obteniendo ubicación...</p>
        )}
      </div>
      <ul className="list-group w-auto">
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center" aria-current="true">
          <Link to="/signup">Registro</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center" aria-current="true">
          <Link to="/help-places">Lugares de ayuda</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/embassies">Embajadas</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/chat">Mensajería</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/blog">Blog</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/gadgets">Gadgets</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/chatbot">Chatbot</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/contact-list">Contact List</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/immigration-requirements">Requisitos migratorios</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/paypal-balance">Saldo Paypal</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/freq-asked-questions">Preguntas Frecuentes</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/emergency">Emergencia</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/stats-and-reports">Estadísticas y reportes</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/help">Contactar Ayuda</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/location-view">Vista de ubicación</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/admin-console">Consola de manejo de datos</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/dashboard-edition">Panel de edición de dashboard de usuarios</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
