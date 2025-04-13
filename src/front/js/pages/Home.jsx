import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import './../../styles/home.css';
import { BsChatSquareTextFill } from "react-icons/bs";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddAlert } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";




const Home = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const token = localStorage.getItem('token');
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
          actions.setUserLocation(latitude, longitude);
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
    <div>
      {token ? (
        <div className='backpage'>
          <div className='container'>
            <h2 className='heading'>Inicio</h2>
            <div className='formis'>

              {/* {token && (
                <Link className='login-buttones' to='/chat'>
                  <BsChatSquareTextFill style={{ fontSize: '3em' }} />
                  <p>Mensajería</p>
                </Link>
              )} */}
              
              {token && (
                <Link className='login-buttones' to='/contact-list'>
                  <RiContactsFill style={{ fontSize: '3em' }} />
                  <p>Mis contactos</p>
                </Link>
              )}
              {token && (
                <Link className='login-buttones' to='/location-view'>
                  <FaLocationDot style={{ fontSize: '3em' }} />
                  <p> Vista de ubicación</p>
                </Link>
              )}
              {token && (
                <Link className='login-buttones' to='/freq-asked-questions'>
                  <FaQuestionCircle style={{ fontSize: '3em' }} />
                  <p>Preguntas Frecuentes</p>
                </Link>
              )}
              {token && (
                <Link className='login-buttones' to='/chatbot'>
                  <TbMessageChatbotFilled style={{ fontSize: '3em' }} />
                  <p>Chatbot</p>
                </Link>
              )}
              {/* {token && (
                <Link className='login-buttones' to='/help'>
                  <FaQuestionCircle style={{ fontSize: '3em' }} />
                  <p>FAQ</p>
                </Link>
              )} */}
              {token && admin && (
                <Link className='login-buttones' to='/stats-and-reports'>
                  <p>Estadísticas y reportes(ADMIN)</p>
                </Link>
              )}
              
              {token && (
                <Link className='login-buttones' to='/blog'>
                  <BsChatSquareTextFill style={{ fontSize: '3em' }} />
                  <p>Personalizado</p>
                </Link>
              )} 
              {token && (
                <Link className='login-buttones' to='/blog'>
                  <BsChatSquareTextFill style={{ fontSize: '3em' }} />
                  <p>Personalizado</p>
                </Link>
              )} 
              {token && admin && (
                <Link className='login-buttones' to='/admin-console'>
                  <p>Consola de manejo de datos(ADMIN)</p>
                </Link>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Por favor inicia sesión</h1>
          <Link to='/login'>Iniciar sesión</Link>
        </div>
      )}
    </div>
  );
};

export default Home
