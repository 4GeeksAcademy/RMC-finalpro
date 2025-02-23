import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import countriesData from './../../../../countries.json';
import statesData from './../../../../states.json';
import citiesData from './../../../../cities.json';


const Register = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    general_data:
    {
      first_name: '',
      first_last_name: '',
      second_last_name: '',
      nacionality: '',
      gender: '',
      birthdate: '',
      email: '',
      password: '',
      phone_number: '',
      facebook: '',
      instagram: '',
      x: ''
    },
    clinical_data:
    {
      blood_type: '',
      allergy: '',
      disease: '',
    },
    aditional_data:
    {
      city: '',

      address: '',
      home_country: '',
      country_of_residence: '',
      country_of_destination: '',
      zip_code: ''
    },

    location:
     {
       latitude: '',
       longitude: ''
     }
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    let category = null;

    // Se determina la categoría según el nombre del input
    if (formData.general_data.hasOwnProperty(name)) {
      category = "general_data";
    } else if (formData.clinical_data.hasOwnProperty(name)) {
      category = "clinical_data";
    } else if (formData.aditional_data.hasOwnProperty(name)) {
      category = "aditional_data";
    } else if (formData.location.hasOwnProperty(name)) {
      category = "location";
    } else {
      console.warn(`No se encontró la categoría para el campo "${name}"`);
    }

    if (category) {
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [name]: value,
        },
      });
    }
    console.log("este mero", formData[category][name])
  };

  const handleSubmit = () => {

    let dataToSend = formData;
    actions.register(dataToSend);


    console.log(formData);
  };
  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      aditional_data: {
        ...formData.aditional_data,
        country_of_residence: e.target.value,
        state: "", // Resetea el estado al cambiar de país
        city: "", // Resetea la ciudad al cambiar de país
      },
    });
  };

  // Manejo especial para seleccionar un estado
  const handleStateChange = (e) => {
    setFormData({
      ...formData,
      aditional_data: {
        ...formData.aditional_data,
        state: e.target.value,
        city: "", // Resetea la ciudad al cambiar de estado
      },
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Bienvenid@ a tu migrante app</h2>
        <h3>Completa el siguiente formulario para inscribirte</h3>
        <div className='card'>
          <div>
            <div>
              <h3>DATOS GENERALES</h3>
              <label>Apellido Paterno</label>
              <input type="text" name="first_name" placeholder='A.Paterno' value={formData.general_data.first_name} onChange={handleChange} />
            </div>
            <div>
              <label>Apellido Materno</label>
              <input type="text" name="first_last_name" placeholder='A.Materno' value={formData.general_data.first_last_name} onChange={handleChange} />
            </div>
            <div>
              <label>Nombre(s)</label>
              <input type="text" name="second_last_name" placeholder='Nombre(s)' value={formData.general_data.second_last_name} onChange={handleChange} />
            </div>
            <div>
              <label>Contraseña</label>
              <input type="password" name="password" placeholder='Contraseña' value={formData.general_data.password} onChange={handleChange} />
            </div>

            <div>
              <label>Pais de Nacimiento</label>
              <select name="home_country" value={formData.aditional_data.home_country} onChange={handleChange}>
                <option value="">Seleccione un país</option>
                {countriesData.countries && countriesData.countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Pais de Destino</label>
              <select name="country_of_destination" value={formData.aditional_data.country_of_destination} onChange={handleChange}>
                <option value="">Seleccione un país</option>
                {countriesData.countries && countriesData.countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Nacionalidad</label>
              <select name="nacionality" value={formData.general_data.nacionality} onChange={handleChange}>
                <option value="">Seleccione una nacionalidad</option>
                {countriesData.countries.map((nationality, index) => (
                  <option key={index} value={nationality.name}>{nationality.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Género</label>
              <select name="gender" value={formData.general_data.gender} onChange={handleChange}>
                <option value="">Seleccione un género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input type="date" name="birthdate" placeholder='añadir date' value={formData.general_data.birthdate} onChange={handleChange} />
            </div>
            <h3>DATOS ADICIONALES</h3>
            <div>
              <label>Dirección completa</label>
              <input type="text" name="address" placeholder='Dirección completa' value={formData.aditional_data.address} onChange={handleChange} />
            </div>
            <div>
              <label>Código Postal</label>
              <input type="number" name="zip_code" placeholder='Código Postal' value={formData.aditional_data.zip_code} onChange={handleChange} />
            </div>
            <div>
            <label>País</label>
        <select name="country_of_residence" value={formData.aditional_data.country_of_residence} onChange={handleCountryChange}>
          <option value="">Seleccione un país</option>
          {countriesData.countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
            </div>
            <div>
            <label>Estado</label>
        <select name="state" value={formData.aditional_data.state} onChange={handleStateChange} disabled={!formData.aditional_data.country_of_residence}>
          <option value="">Seleccione un estado</option>
          {statesData.states
    .filter((state) => {
      // Encuentra el país seleccionado en countries.json
      const selectedCountry = countriesData.countries.find(
        (country) => country.name === formData.aditional_data.country_of_residence
      );
      
      // Compara el id del país con el id_country del estado
      return selectedCountry && state.id_country === selectedCountry.id;
    })
    .map((state, index) => (
      <option key={index} value={state.name}>
        {state.name}
      </option>
    ))}
</select>
            </div>
            <div>
            <label>Ciudad</label>
        <select name="city" value={formData.aditional_data.city} onChange={handleChange} disabled={!formData.aditional_data.state}>
          <option value="">Seleccione una ciudad</option>
          {citiesData.cities
    .filter((city) => {
      // Encuentra el estado seleccionado en states.json
      const selectedState = statesData.states.find(
        (state) => state.name === formData.aditional_data.state
      );

      // Compara el id del estado con el id_state de la ciudad
      return selectedState && city.id_state === selectedState.id;
    })
    .map((city, index) => (
      <option key={index} value={city.name}>
        {city.name}
      </option>
    ))}
</select>
            </div>
            <h3>DATOS DE CONTACTO</h3>
            <div>
              <label>Teléfono</label>
              <input type="number" name="phone_number" placeholder='Teléfono' value={formData.general_data.phone_number} onChange={handleChange} />
           
            </div>
            <div>
              <label>Correo Electrónico</label>
              <input type="email" name="email" placeholder='Email' value={formData.general_data.email} onChange={handleChange} />
            </div>
            <div>
              <label>Facebook</label>
              <input type="text" name="facebook" placeholder='Facebook' value={formData.general_data.facebook} onChange={handleChange} />
            </div>
            <div>
              <label>Instagram</label>
              <input type="text" name="instagram" placeholder='Instagram' value={formData.general_data.instagram} onChange={handleChange} />
            </div>
            <div>
              <label>Twitter o X</label>
              <input type="text" name="x" placeholder='Twitter o X' value={formData.general_data.x} onChange={handleChange} />
            </div>
            <h3>DATOS CLÍNICOS</h3>
            <div>
              <label>Tipo de Sangre</label>
              <input type="text" name="blood_type" placeholder='Añadir Select' value={formData.clinical_data.blood_type} onChange={handleChange} />
            </div>
            <div>
              <label>Alergias</label>
              <input type="text" name="allergy" placeholder='Alergias' value={formData.clinical_data.allergy} onChange={handleChange} />
            </div>
            <div>
              <label>Enfermedades crónicas</label>
              <input type="text" name="disease" placeholder='Enfermedades Crónicas' value={formData.clinical_data.disease} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
