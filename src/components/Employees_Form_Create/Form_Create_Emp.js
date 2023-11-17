import React, { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import {  useForm } from 'react-hook-form';
import { addNewEmployee, fetchEmployeeUtilities } from '../../hooks/utilities/connectionUtils';
import { showConfirmationAlert } from '../../hooks/utilities/notificationUtils';
import { cuilValidatorFinal, emailValidator } from '../../hooks/validators/formDataValidators';

const Form_Create = ({id, token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { roles, sectores, supervisores } = await fetchEmployeeUtilities({userToken: token, id: 1 });
    setRoles(roles);
    setSectores(sectores);
    setSupervisores(supervisores);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!roles) {
    return <div>No se encontraron datos</div>;
  }

  const procesarFormulario = async (data, e) =>{
    const response = await showConfirmationAlert();
    const responseEmail = await emailValidator({userToken: token ,email: data.correo, id: null})
    const responseCuil = await cuilValidatorFinal({userToken: token ,cuil: data.cuil})
    if (response && responseEmail && responseCuil) {
      await addNewEmployee({userToken: token, data: data})
      e.target.reset();
      window.location.reload();
    }
  }

  return (
    <Fragment>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Empleado"
            className="input"
            name="nombreEmpleado"
            minLength={2}
            maxLength={55}
            {
              ...register('nombreEmpleado',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 55,
                  message: 'Debe ser menor a 55'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: 'Este campo solo acepta letras y espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.nombreEmpleado?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Usuario"
            className="input"
            name="apellidoEmpleado"
            minLength={2}
            maxLength={55}
            {
              ...register('apellidoEmpleado',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 55,
                  message: 'Debe ser menor a 55'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: 'Este campo solo acepta letras y espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.apellidoEmpleado?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            placeholder="Ingrese fecha de nacimiento"
            className="input"
            type='date'
            name="fechaNacimiento"
            {
              ...register('fechaNacimiento',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.fechaNacimiento?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Genero</Form.Label>
          <Form.Select 
            name="genero" 
            {...register('genero')}>
            <option value='F'>Femenino</option>
            <option value='M'>Masculino</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.genero?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            placeholder="Ingrese direccion del empleado"
            className="input"
            name="direccion"
            minLength={2}
            maxLength={400}
            {
              ...register('direccion',{
                required: {
                  value: false,
                  message: 'Campo requerido'
                },
                maxLength: {
                  value: 400,
                  message: 'Debe ser menor a 400'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ,.]+$/i,
                  message: 'Este campo solo acepta letras, números y espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.direccion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            placeholder="Ingrese telefono del empleado"
            className="input"
            name="telefono"
            {
              ...register('telefono',{
                required: {
                  value: false,
                  message: 'Campo requerido'
                },
                pattern: { 
                  value: /^\+?[0-9\s-]+$/i,
                  message: 'Este campo solo acepta números y/o el simbolo + al comienzo'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.telefono?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-12 mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Ingrese el email del empleado"
            className="input"
            type='email'
            name="correo"
            minLength={2}
            maxLength={300}
            {
              ...register('correo',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 300,
                  message: 'Debe ser menor a 300'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                  message: 'Este campo solo acepta Correos Electrónicos'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.correo?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Fecha de Contratacion</Form.Label>
          <Form.Control
            placeholder="Ingrese fecha de contratacion"
            className="input"
            type='date'
            name="fechaContratacion"
            {
              ...register('fechaContratacion',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.fechaContratacion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>CUIL</Form.Label>
          <Form.Control
            placeholder="Ingrese CUIL del empleado"
            className="input"
            type='number'
            name="cuil"
            min={10000000000}
            max={99999999999}
            {
              ...register('cuil',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                max: {
                  value: 99999999999,
                  message: 'Debe ser de 11 dígitos'
                },
                min: {
                  value: 10000000000,
                  message: 'Debe ser de 11 dígitos'
                }, 
                pattern: { 
                  value: /^\+?[0-9\s-]+$/i,
                  message: 'Este campo solo acepta números'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.cuil?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Supervisor</Form.Label>
          <Form.Select 
            name="legajoSupervisor" 
            {...register('legajoSupervisor')}>
            {supervisores.map(supervisor => <option value={supervisor.legajoEmpleado}>{supervisor.apellidoEmpleado}, {supervisor.nombreEmpleado}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.legajoSupervisor?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-3 mt-2">
          <Form.Label>Rol</Form.Label>
          <Form.Select 
            name="rolIdRol" 
            {...register('rolIdRol')}>
            {roles.map(rol => <option value={rol.idRol}>{rol.nombreRol}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.rolIdRol?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-3 mt-2">
          <Form.Label>Sector</Form.Label>
          <Form.Select 
            name="sectorIdSector" 
            {...register('sectorIdSector')}>
            {sectores.map(sector => <option value={sector.idSector}>{sector.nombreSector}</option>)}
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.sectorIdSector?.message}
          </Form.Text>
        </Form.Group>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-dark">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Form_Create