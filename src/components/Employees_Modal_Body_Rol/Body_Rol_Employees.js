import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {utilitiesEmployer, utilitiesRolSector } from '../../hooks/useForm/utilities';

const BodyRolEmployees = ({id}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employer, setEmployer] = useState([]);
  
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const userToken = localStorage.getItem('token'); 
    const url = process.env.REACT_APP_API_URL;
    const { employer, roles, sectores} = await utilitiesEmployer({ URL: url, userToken: userToken, id: id });
    setEmployer(employer);
    setRoles(roles);
    setSectores(sectores);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employer) {
    return <div>No se encontraron datos</div>;
  }
  const procesarFormulario = (data, e) =>{
    console.log(data)
  }
  return (
    <Fragment>
      <div className='mx-3'>
        <p>Actualmente {employer.genero == 'F' ? "la empleada" : "el empleado"} {employer.nombreEmpleado}, {employer.apellidoEmpleado} se encuentra en el sector de {employer.sector.nombreSector} con el rol de {employer.rol.nombreRol}</p>
      </div>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Rol</Form.Label>
          <Form.Select 
            name="rol" 
            defaultValue={employer.rol.idRol}
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
            defaultValue={employer.sector.idSector}
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