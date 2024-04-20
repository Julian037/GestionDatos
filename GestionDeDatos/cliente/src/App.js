import {BrowserRouter, Routes, Route, Link,} from "react-router-dom";
//import { Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import ListaEmpleados from './componentes/ListaEmpleados';
import RegistroEmpleado from './componentes/RegistroEmpleado';
import DetallesEmpleado from './componentes/DetallesEmpleado';
import EditarEmpleado from './componentes/EditarEmpleado';


function App() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  };

  const actualizarListaEmpleados = () => {
    obtenerEmpleados();
  };


//FUNCIONA PERO ME QUEDA LA DUDA PORQUE NO SIRVE PARA 'OBTENER POR ID' O BUSCAR COMO DEBERIA HACER. EN VEZ DE ESO SOLO SIRVE PARA REGISTRAR.
  return (
<BrowserRouter>
  <div className="container">
    <h1>Registro de Empleados</h1>
    <Routes>
      <Route path="/" element={<RegistroEmpleado actualizarListaEmpleados={actualizarListaEmpleados} />} />
      <Route path="/empleados" element={<ListaEmpleados empleados={empleados} obtenerEmpleados={obtenerEmpleados} />} />
      <Route path="/empleados/:id" element={<DetallesEmpleado />} />
      <Route path="/empleados/:id/editar" element={<EditarEmpleado />} />
    </Routes>
  </div>
</BrowserRouter>
  );


  //ESTE ES DE DONALDO PARA HACER LA MODIFICACION DE 'OBTENER POR ID #4', PERO LA ETIQUETA 'SWITCH' NO FUNCIONA POR SER OTRA VERSION DEL "react-router-dom".
  /*return (
    <Router>
      <div className="container">
        <h1>Registro de Empleados</h1>
        <Switch>
          <Route path="/" exact>
            <RegistroEmpleado actualizarListaEmpleados={actualizarListaEmpleados} />
            <ListaEmpleados empleados={empleados} />
          </Route>
          <Route path="/empleados/:id" component={DetallesEmpleado} />
        </Switch>
      </div>
    </Router>
  );*/


  //ESTE ERA EL CODIGO DE ANTES DE HACER LA MODIFICACION, EL CUAL FUNCIONABA Y MOSTRABA LA LISTA
  /*return (
    <div className="container">
      <h1>Registro de Empleados</h1>
      <RegistroEmpleado actualizarListaEmpleados={actualizarListaEmpleados} />
      <ListaEmpleados empleados={empleados} />
    </div>
  );*/


}

export default App;

