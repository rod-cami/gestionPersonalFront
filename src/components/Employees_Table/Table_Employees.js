import React, { useEffect, useState } from 'react'
import getDatos from '../../hooks/useApi/getDatos'
import { Table } from 'react-bootstrap';
import RowEmployees from '../Employees_Row_Table/Row_Employees';

const TableEmployees = () => {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    try {
      const data = await getDatos(`https://gestionpersonal.azurewebsites.net/Empleado`);
      setDatos(data)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

}

  useEffect(()=>{obtenerDatos()},[]);

  //console.log(datos)
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
              <RowEmployees name={`${x.nombreEmpleado}, ${x.apellidoEmpleado}`} gender={x.genero} phone={x.telefono} email={x.correo} id={x.legajoEmpleado}/>
            )
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TableEmployees