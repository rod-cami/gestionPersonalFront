import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import RowEmployees from '../Employees_Row_Table/Row_Employees';
import { fetchEmployeeUtilities } from '../../hooks/utilities/connectionUtils';

const TableEmployees = ({token}) => {

  const [empleados, setEmpleados] = useState([]);
  const [supervisores, setSupervisores] = useState([]);

  const obtenerDatos = async () => {
    try {
      token = localStorage.getItem('token');
      const { supervisores, noSupervisores } = await fetchEmployeeUtilities({userToken: token, id: 1 });
      setEmpleados(noSupervisores);
      setSupervisores(supervisores);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

}

  useEffect(()=>{obtenerDatos()},[]);
  return (
    <>
      <button type="button" className="btn btn-outline-dark "><i className="bi bi-search"></i></button>
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
            {empleados.map(x => 
              <RowEmployees name={`${x.nombreEmpleado}, ${x.apellidoEmpleado}`} gender={x.genero} phone={x.telefono} id={x.legajoEmpleado} token={token} finContrato={x.fechaFinContrato} rol={x.rolIdRol}/>
            )
            }
          </tbody>
        </Table>
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