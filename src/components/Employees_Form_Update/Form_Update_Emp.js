import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { showConfirmationAlert } from '../../hooks/utilities/notificationUtils';
import { fetchEmployeeUtilities, updateEmployee } from '../../hooks/utilities/connectionUtils';
import { emailValidator } from '../../hooks/validators/formDataValidators';

const Form_Update = ({id, token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employeeUpdate } = await fetchEmployeeUtilities({userToken: token, id: id });
    setEmployee(employeeUpdate);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employee) {
    return <div>No se encontraron datos</div>;
  }

  ;

  const procesarFormulario = async (data, e) =>{
    const validacion = await emailValidator({userToken: token ,email: data.correo, id: id})
    const response = await showConfirmationAlert();
    if (validacion && response) {
      const employeeUpdate = {
        legajoEmpleado: parseInt(employee.legajoEmpleado, 10),
        nombreEmpleado: employee.nombreEmpleado,
        apellidoEmpleado: employee.apellidoEmpleado,
        fechaNacimiento: employee.fechaNacimiento,
        genero: data.genero,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
        fechaContratacion: employee.fechaContratacion,
        cuil: parseInt(employee.cuil, 10), 
        legajoSupervisor: parseInt(employee.legajoSupervisor, 10),  
        rolIdRol: parseInt(employee.rolIdRol, 10),  
        sectorIdSector: parseInt(employee.sectorIdSector, 10)  
      };
      await updateEmployee({userToken: token, data: employeeUpdate, id: id})
      e.target.reset();
      window.location.reload();
      
    }
  }
  return (
    <Fragment>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-12 col-md-6 mt-2">
          <Form.Label>Genero</Form.Label>
          <Form.Select 
            name="genero" 
            defaultValue={employee.genero}
            {...register('genero')}>
            <option value='F'>Femenino</option>
            <option value='M'>Masculino</option>
            <option value='N'>Prefiero no decirlo</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.genero?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-12 col-md-6 mt-2'>
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            placeholder="Ingrese direccion del empleado"
            className="input"
            name="direccion"
            minLength={2}
            maxLength={400}
            defaultValue={employee.direccion}
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
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: 'Este campo solo acepta letras, números y espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.direccion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-12 col-md-6 mt-2'>
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            placeholder="Ingrese telefono del empleado"
            className="input"
            name="telefono"
            defaultValue={employee.telefono}
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
        <Form.Group className="col-12 col-md-6 mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Ingrese el email del empleado"
            className="input"
            type='email'
            name="correo"
            minLength={2}
            maxLength={300}
            defaultValue={employee.correo}
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
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-dark">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Form_Update