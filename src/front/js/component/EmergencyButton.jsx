import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';
import './../../styles/home.css';


const EmergencyButton = ({ userId }) => {
    const { actions } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const handleEmergencia = () => {
        setLoading(true);
        setShowCountdown(false);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude.toString();
                    const longitude = position.coords.longitude.toString();

                    try {
                        await actions.sendEmergencyCoordinates(latitude, longitude);

                        Swal.fire("Coordenadas enviadas correctamente.");



                    } catch (error) {
                        Swal.fire(error.message || "Hubo un error al enviar las coordenadas.");
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    Swal.fire("No se pudo obtener la ubicación.");
                    setLoading(false);
                }
            );
        } else {
            Swal.fire("Geolocalización no soportada en este navegador.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showCountdown && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            handleEmergencia();
        }
    }, [showCountdown, countdown]);

    return (
        <>
            <button
                onClick={() => {
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "Se enviará una alerta de EMERGENCIA a todos tus contactos.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sí, enviar alerta",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setShowCountdown(true);
                            setCountdown(5);
                        }
                    });
                }}
                className="login-buttonesEmergencia"
                disabled={loading}
            >
                <i className="fas fa-exclamation-triangle me-2"></i>
                {loading ? '' : ''}
            </button>

            {showCountdown && (
                <div className="modal-overlay">
                    <div className="modal-contentE">
                        <h2>Enviando alerta en...</h2>
                        <p className="countdown">{countdown}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmergencyButton;