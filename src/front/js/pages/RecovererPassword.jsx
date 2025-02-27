import React, { useState } from 'react';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, una minúscula y un número.");
      return;
    }

    setError("");
    setMessage("Se ha enviado un correo con las instrucciones para restablecer tu contraseña.");
    console.log("Recuperar contraseña para:", { email, password });
   
  };

  return (
    <div className='container mt-5'>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className="col-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Nueva Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <button type="submit" className='btn btn-primary'>Restablecer contraseña</button>

          <div className="mt-3">
            <label>¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a></label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
