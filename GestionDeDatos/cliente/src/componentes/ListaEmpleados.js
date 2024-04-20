
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

//CON ESTO FUNCIONA Y MUESTRA LA LISTA DE EMPLEADOS
const ListaEmpleados = ({ empleados , obtenerEmpleados}) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/empleados/${id}`)
      alert('Empleado eliminado exitosamente');
    } catch (error) {
      console.error('Ha ocurrido un error inesperado', error);
    }
  };

  useEffect(() => {
    obtenerEmpleados()
  }, [])
  
  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul className="collection">
        {empleados.map((empleado) => (
          <li key={empleado._id} className="collection-item">
            <strong>Nombre:</strong> 
              <Link to={`/empleados/${empleado._id}`}>
              {empleado.nombre}
            </Link><br />
            <strong>Email:</strong> {empleado.email}<br />
            <strong>Puesto:</strong> {empleado.puesto}<br />
            <button className="btn" onClick={() => handleDelete(empleado._id)}>eliminar</button>
          </li>
        ))}
      </ul>
    </div>
    );
  };
export default ListaEmpleados;


//CON ESTO FUNCIONA, PERO SOLO MUESTRA LA LISTA CON NOMBRES SIN MAS DATOS.
/*const ListaEmpleados = ({ empleados }) => {
  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul className="collection">
        {empleados.map((empleado) => (
          <li key={empleado._id} className="collection-item">
            <Link to={'/empleados/${empleado._id}'}>
              {empleado.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    );
  };
export default ListaEmpleados;*/

