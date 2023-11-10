import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {fetchEmployeeUtilities, updateEmployee} from '../../hooks/utilities/connectionUtils';
import { showConfirmationAlert } from '../../hooks/utilities/notificationUtils';

const BodyRolEmployees = ({id,token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employee, setEmployee] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employee, roles, sectores} = await fetchEmployeeUtilities({userToken: token, id: id });
    const rolesExceptLast = roles.slice(0, -1);
    setEmployee(employee);
    setRoles(rolesExceptLast);
    setSectores(sectores);
    setLoading(false);
  };
  
  useEffect(()=>{obtenerDatos()},[]);
  

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
        legajoSupervisor: parseInt(employee.legajoSupervisor, 10),  
        rolIdRol: parseInt(data.rol, 10),  
        sectorIdSector: parseInt(data.sector, 10)  
      };
      await updateEmployee({userToken: token, data: employeeUpdate, id: id})
      e.target.reset();
      window.location.reload();
      
    }
  }

  return (
    <Fragment>
      <div className='mx-3'>
        <p className='fw-light'>Actualmente {employee.genero == 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} se encuentra en el sector de {employee.sector.nombreSector} con el rol de {employee.rol.nombreRol}</p>
      </div>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label className='fw-semibold'>Rol</Form.Label>
          <Form.Select 
            name="rol" 
            defaultValue={employee.rol.idRol}
            {...register('rol')}>
            {roles.map(rol => <option value={rol.idRol}>{rol.nombreRol}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.rol?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label className='fw-semibold'>Sector</Form.Label>
          <Form.Select 
            name="sector" 
            defaultValue={employee.sector.idSector}
            {...register('sector')}>
            {sectores.map(sector => <option value={sector.idSector}>{sector.nombreSector}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.sector?.message}
          </Form.Text>
        </Form.Group>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-dark">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default BodyRolEmployees