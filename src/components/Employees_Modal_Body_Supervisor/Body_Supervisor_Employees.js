import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { fetchEmployeeUtilities, updateEmployee} from '../../hooks/utilities/connectionUtils';
import { showConfirmationAlert } from '../../hooks/utilities/notificationUtils';

const BodySupervisorEmployees = ({id,token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employee, setEmployee] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employee, supervisor, supervisores} = await fetchEmployeeUtilities({userToken: token, id: id });
    setEmployee(employee);
    setSupervisor(supervisor);
    setSupervisores(supervisores);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[id]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employee) {
    return <div>No se encontraron datos</div>;
  }

  const procesarFormulario = async (data, e) =>{
    const response = await showConfirmationAlert();
    if (response) {
      const employeeUpdate = {
        legajoEmpleado: parseInt(employee.legajoEmpleado, 10),
        nombreEmpleado: employee.nombreEmpleado,
        apellidoEmpleado: employee.apellidoEmpleado,
        fechaNacimiento: employee.fechaNacimiento,
        genero: employee.genero,
        direccion: employee.direccion,
        telefono: employee.telefono,
        correo: employee.correo,
        fechaContratacion: employee.fechaContratacion,
        cuil: parseInt(employee.cuil, 10), 
        legajoSupervisor: parseInt(data.supervisor, 10),  
        rolIdRol: parseInt(employee.rol.idRol, 10),  
        sectorIdSector: parseInt(employee.sector.idSector, 10)  
      };
      await updateEmployee({userToken: token, data: employeeUpdate, id: id})
      e.target.reset();
      window.location.reload();
      
    }
  }

  return (
    <Fragment>
      <div className='mx-3'>
        {employee.rolIdRol == 8 ? <p className='fw-light'>Actualmente {employee.genero === 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} es un supervisor.</p> : <p className='fw-light'>Actualmente {employee.genero === 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} se encuentra supervisado por {supervisor.nombreEmpleado}, {supervisor.apellidoEmpleado} </p>}
      </div>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-md-12 mt-2">
          <Form.Label className='fw-medium'>Supervisor</Form.Label>
          <Form.Select 
            name="supervisor" 
            defaultValue={supervisor.legajoEmpleado}
            {...register('supervisor')}>
            {supervisores.map(supervisor => <option value={supervisor.legajoEmpleado}> {supervisor.nombreEmpleado}, {supervisor.apellidoEmpleado}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.supervisor?.message}
          </Form.Text>
        </Form.Group>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-dark">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default BodySupervisorEmployees