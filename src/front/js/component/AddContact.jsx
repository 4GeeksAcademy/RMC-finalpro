import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";

const AddContact = () => {
    const { actions } = useContext(Context);                                        
    const [errors, setErrors] = useState({});             
    const [payload, setPayload] = useState({               
        full_name: "",   
        email: "",        
        phone_number: "",                                                                       
        role: "",      
        user_id: ""  // 🔹 Agregamos user_id en el estado  
    });         
          
    // Obtener user_id desde localStorage al montar el componente  
    useEffect(() => {
        const storedUserId = localStorage.getItem("id");
        if (storedUserId) {
            setPayload(prevPayload => ({
                ...prevPayload,     
                user_id: storedUserId // 🔹 Lo asignamos al payload      
            }));
        }       
    }, []);              
    // Manejo del cambio en los inputs                            
 
    const handleChange = (e) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    };
    
    // Validación del formulario
    const validateForm = () => {
        let newErrors = {};
        let genericLegend = "*Campo obligatorio.";

        if (!payload.full_name.trim()) newErrors.full_name = genericLegend;
        if (!payload.email.trim()) newErrors.email = genericLegend;
        if (!payload.phone_number.trim()) newErrors.phone_number = genericLegend;fffg
        if (!payload.role.trim()) newErrors.role = genericLegend;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna `true` si no hay errores
    };

    // Manejo del envío del formulario
    const handleAdd = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("Enviando payload:", payload); // 🔹 Verifica que user_id esté en el payload
            actions.addContact(payload);
            setPayload({
                full_name: "",
                email: "",
                phone_number: "",
                role: "",
                user_id: localStorage.getItem("id") || "" // 🔹 Mantiene user_id después del reset
            });
        }
    };

    return (
        <div className="">
            <form onSubmit={handleAdd}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="full_name"
                        value={payload.full_name}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        className="form-control"
                    />
                    {errors.full_name && <p className="text-danger">{errors.full_name}</p>}
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={payload.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="form-control"
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="phone_number"
                        value={payload.phone_number}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className="form-control"
                    />
                    {errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="role"
                        value={payload.role}
                        onChange={handleChange}
                        placeholder="Parentesco"
                        className="form-control"
                    />
                    {errors.role && <p className="text-danger">{errors.role}</p>}
                </div>

                <button type="submit" className="btn btn-warning">
                    Guardar contacto
                </button>
            </form>
        </div>
    );
};

export default AddContact;

