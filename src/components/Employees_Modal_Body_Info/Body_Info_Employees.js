import React, { useEffect, useState } from 'react'
import { fetchEmployeeUtilities } from '../../hooks/utilities/connectionUtils';

const BodyInfoEmployees =({id, token}) => {

  const [employee, setEmployee] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employee, supervisor } = await fetchEmployeeUtilities({userToken: token, id: id });
    setEmployee(employee);
    setSupervisor(supervisor);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employee) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <>
      <div>
        <table className="table table-borderless talbe-bg-transparent">
          <tbody className='fw-light text-start'>
            <tr>
              <td>Empleado</td>
              <td>{employee.nombreEmpleado}, {employee.apellidoEmpleado}</td>
            </tr>
            <tr>
              <td>CUIL</td>
              <td>{employee.cuil}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{employee.correo}</td>
            </tr>
            {employee.fechaFinContrato ? 
              <>
                <tr>
                  <td>Rol</td>
                  <td>No posee rol actualmente</td>
                </tr>
                <tr>
                  <td>Sector</td>
                  <td>No posee sector actualmente</td>
                </tr>
                <tr>
                  <td>Supervisor</td>
                  <td>No posee supervisor actualmente</td>
                </tr>
              </>
            :
              <>
                <tr>
                  <td>Rol</td>
                  <td>{employee.rol.nombreRol}</td>
                </tr>
                <tr>
                  <td>Sector</td>
                  <td>{employee.sector.nombreSector}</td>
                </tr>
                <tr>
                  <td>Supervisor</td>
                  {supervisor ?  <td>{supervisor.nombreEmpleado}, {supervisor.apellidoEmpleado}</td> : <td>No posee supervisor actualmente</td> }
                </tr>
              </>
            }
            
            <tr>
              <td>Fecha de Contratación</td>
              <td>{(employee.fechaContratacion).slice(0,10)}</td>
            </tr>
            <tr>
              <td>Fecha de Nacimiento</td>
              <td>{(employee.fechaNacimiento).slice(0,10)}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{employee.telefono ? employee.telefono : 'No posee número de teléfono'}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{employee.direccion ? employee.direccion : 'No posee dirección'}</td>
            </tr>
            <tr>
              <td>Género</td>
              <td>{employee.genero === 'F' ? 'Femenino' : 'Masculino'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BodyInfoEmployees