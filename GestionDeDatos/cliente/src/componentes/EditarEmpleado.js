
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useParams, useHistory } from 'react-router-dom'; //ESTE ES EL ORIGINAL PERO NO FUNCIONA. SE REEMPLAZA POR EL DE ABAJO
import { useParams, useNavigate } from 'react-router-dom';


const EditarEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [puesto, setPuesto] = useState('');
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const obtenerEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/empleados/${id}`);
        const { nombre, email, puesto } = response.data;
        setNombre(nombre);
        setEmail(email);
        setPuesto(puesto);
      } catch (error) {
        console.error('Error al obtener el empleado:', error);
      }
    };

    obtenerEmpleado();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const empleadoActualizado = {
        nombre,
        email,
        puesto,
      };

      await axios.put(`http://localhost:5000/api/empleados/${id}`, empleadoActualizado);
      history.push(`/empleados/${id}`);
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
    }
  };

  return (
    <div>
      <h2>Editar Empleado</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (los mismos campos de entrada que en RegistroEmpleado) ... */}
   
        <div className="input-field">
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="input-field">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            id="puesto"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            required
          />
          <label htmlFor="puesto">Puesto</label>
        </div>
        <button type="submit" className="btn">
        Actualizar
        </button>
      </form>
    </div>
  );
};


export default EditarEmpleado;

