import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import RowEmployees from '../Employees_Row_Table/Row_Employees';
import { fetchEmployeeUtilities } from '../../hooks/utilities/connectionUtils';
import { useForm } from 'react-hook-form';

const TableEmployees = ({token}) => {
  const [busquedaEmpleado, setBusquedaEmpleado] = useState("");
  const [busquedaSupervisor, setBusquedaSupervisor] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [tablaEmpleados, setTablaEmpleados] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [tablaSupervisores, setTablaSupervisores] = useState([]);

  const obtenerDatos = async () => {
    try {
      token = localStorage.getItem('token');
      const { supervisores, noSupervisores } = await fetchEmployeeUtilities({userToken: token, id: 1 });
      setEmpleados(noSupervisores);
      setTablaEmpleados(noSupervisores);
      setSupervisores(supervisores);
      setTablaSupervisores(supervisores)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

  }
  const handleChangeEmployees = e =>{
    setBusquedaEmpleado(e.target.value)
    filterEmployees(e.target.value)
  }

  const filterEmployees = (item) => {
    const result = tablaEmpleados.filter((x) => {
      if (x.legajoEmpleado == parseInt(item) || (x.nombreEmpleado).toString().toLowerCase().includes(item.toLowerCase()) || (x.apellidoEmpleado).toString().toLowerCase().includes(item.toLowerCase())){
        return x;
      }
    })
    setEmpleados(result)
  }

  const handleChangeSupervisor = e =>{
    setBusquedaSupervisor(e.target.value)
    filterSupervisor(e.target.value)
  }

  const filterSupervisor = (item) => {
    const result = tablaSupervisores.filter((x) => {
      if (x.legajoEmpleado == parseInt(item) || (x.nombreEmpleado).toString().toLowerCase().includes(item.toLowerCase()) || (x.apellidoEmpleado).toString().toLowerCase().includes(item.toLowerCase())){
        return x;
      }
    })
    setSupervisores(result)
  }
  useEffect(()=>{obtenerDatos()},[]);
  

  return (
    <>
      <div className='d-flex justify-content-end'>
        <div class="input-group mb-3 w-25">
          <input type="text" className="form-control" value={busquedaEmpleado} onChange={handleChangeEmployees} placeholder="Buscar empleado" aria-label="Buscar empleado" aria-describedby="button-search-employees"/>
          <button class="btn btn-outline-dark" type="button" id="button-search-employees"><i className="bi bi-search"></i></button>
        </div>
      </div>
      <div className='container mt-4 mb-5'>
        <Table striped hover responsive size="sm" className='mb-5 caption-top'>
          <caption>Lista empleados</caption>
          <thead>
            <tr className='text-start'>
              <th className='fs-4 fw-medium'>Legajo</th>
              <th className='fs-4 fw-medium'>Nombre</th>
              <th className='fs-4 fw-medium'>Género</th>
              <th className='fs-4 fw-medium'>Teléfono</th>
              <th className='text-center fs-4 fw-medium'>Opciones</th>
            </tr>
          </thead>
          <tbody className='fs-6 text-start fw-light'>
            {empleados && empleados.map(x => 
              <RowEmployees name={`${x.nombreEmpleado}, ${x.apellidoEmpleado}`} gender={x.genero} phone={x.telefono} id={x.legajoEmpleado} token={token} finContrato={x.fechaFinContrato} rol={x.rolIdRol}/>
            )
            }
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-end mt-5'>
        <div class="input-group mb-3 w-25">
          <input type="text" className="form-control" value={busquedaSupervisor} onChange={handleChangeSupervisor} placeholder="Buscar supervisor" aria-label="Buscar supervisor" aria-describedby="button-search-supervisor"/>
          <button class="btn btn-outline-dark" type="button" id="button-search-supervisor"><i className="bi bi-search"></i></button>
        </div>
      </div>
      <div className='container mt-4 mb-5'>
        <Table striped hover responsive size="sm" className='mb-5 caption-top'>
          <caption>Lista supervisores</caption>
          <thead>
            <tr className='text-start'>
              <th className='fs-4 fw-medium'>Legajo</th>
              <th className='fs-4 fw-medium'>Nombre</th>
              <th className='fs-4 fw-medium'>Género</th>
              <th className='fs-4 fw-medium'>Teléfono</th>
              <th className='text-center fs-4 fw-medium'>Opciones</th>
            </tr>
          </thead>
          <tbody className='fs-6 text-start fw-light'>
            {supervisores.map(x => 
              <RowEmployees name={`${x.nombreEmpleado}, ${x.apellidoEmpleado}`} gender={x.genero} phone={x.telefono} id={x.legajoEmpleado} token={token} finContrato={x.fechaFinContrato} rol={x.rolIdRol}/>
            )
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TableEmployees