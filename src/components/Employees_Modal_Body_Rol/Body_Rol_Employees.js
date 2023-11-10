import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {utilitiesEmployee, utilitiesRolSector } from '../../hooks/utilities/employeeUtils';

const BodyRolEmployees = ({id,token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employee, setEmployee] = useState([]);
  
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const url = process.env.REACT_APP_API_URL;
    const { employee, roles, sectores} = await utilitiesEmployee({ URL: url, userToken: token, id: id });
    setEmployee(employee);
    setRoles(roles);
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
  const procesarFormulario = (data, e) =>{
    console.log(data)
  }

  return (
    <Fragment>
      <div className='mx-3'>
        <p>Actualmente {employee.genero == 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} se encuentra en el sector de {employee.sector.nombreSector} con el rol de {employee.rol.nombreRol}</p>
      </div>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Rol</Form.Label>
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
          <Form.Label>Sector</Form.Label>
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