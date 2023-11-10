import React, { useEffect, useState } from 'react'
import getDatos from '../../hooks/api/getDatos'
import { Table } from 'react-bootstrap';
import RowEmployees from '../Employees_Row_Table/Row_Employees';
import { utilitiesEmployee } from '../../hooks/utilities/employeeUtils';

const TableEmployees = ({token}) => {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      const { empleados } = await utilitiesEmployee({ URL: url, userToken: token, id: 1 });
      setDatos(empleados)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

}

  useEffect(()=>{obtenerDatos()},[]);
  return (
    <>
      <div className='container mt-4 mb-5'>
        <Table striped hover responsive size="sm" className='mb-5'>
          <thead>
            <tr className='text-start'>
              <th className='fs-4 fw-light'>Legajo</th>
              <th className='fs-4 fw-light'>Nombre</th>
              <th className='fs-4 fw-light'>Género</th>
              <th className='fs-4 fw-light'>Teléfono</th>
              <th className='fs-4 fw-light'>Email</th>
              <th className='text-center fs-4 fw-light'>Opciones</th>
            </tr>
          </thead>
          <tbody className='fs-6 text-start fw-light'>
            {datos.map(x => 
              <RowEmployees name={`${x.nombreEmpleado}, ${x.apellidoEmpleado}`} gender={x.genero} phone={x.telefono} email={x.correo} id={x.legajoEmpleado} token={token} finContrato={x.fechaFinContrato}/>
            )
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TableEmployees