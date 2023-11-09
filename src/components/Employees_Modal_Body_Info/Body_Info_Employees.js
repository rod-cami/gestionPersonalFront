import React, { useEffect, useState } from 'react'
import { utilitiesEmployer } from '../../hooks/useForm/utilities';

const BodyInfoEmployees =({id}) => {

  const [employer, setEmployer] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employer, supervisor } = await utilitiesEmployer({ id: id });
    setEmployer(employer);
    setSupervisor(supervisor);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employer) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <>
      <div>
        <table className="table table-borderless talbe-bg-transparent">
          <tbody className='fw-light text-start'>
            <tr>
              <td>Empleado</td>
              <td>{employer.nombreEmpleado}, {employer.apellidoEmpleado}</td>
            </tr>
            <tr>
              <td>CUIL</td>
              <td>{employer.cuil}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{employer.correo}</td>
            </tr>
            <tr>
              <td>Rol</td>
              <td>{employer.rol.nombreRol}</td>
            </tr>
            <tr>
              <td>Sector</td>
              <td>{employer.sector.nombreSector}</td>
            </tr>
            <tr>
              <td>Supervisor</td>
              <td>{supervisor.nombreEmpleado}, {supervisor.apellidoEmpleado}</td>
            </tr>
            <tr>
              <td>Fecha de Contratación</td>
              <td>{(employer.fechaContratacion).slice(0,10)}</td>
            </tr>
            <tr>
              <td>Fecha de Nacimiento</td>
              <td>{(employer.fechaNacimiento).slice(0,10)}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{employer.telefono}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{employer.direccion}</td>
            </tr>
            <tr>
              <td>Género</td>
              <td>{employer.genero === 'F' ? 'Femenino' : 'Masculino'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BodyInfoEmployees