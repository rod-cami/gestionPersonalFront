import React, { Fragment } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Form_Update = () => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const procesarFormulario = (data, e) =>{
    console.log(data)
  }
  return (
    <Fragment>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Usuario"
            className="input"
            name="nombre"
            minLength={2}
            maxLength={15}
            {
              ...register('nombre',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 15,
                  message: 'Debe ser menor a 15'
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
            {errors.nombre?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Usuario"
            className="input"
            name="apellido"
            minLength={2}
            maxLength={25}
            {
              ...register('apellido',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 25,
                  message: 'Debe ser menor a 15'
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
            {errors.apellido?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            placeholder="Ingrese fecha de nacimiento"
            className="input"
            type='date'
            name="fecha_nacimiento"
            {
              ...register('fecha_nacimiento',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.fecha_nacimiento?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Genero</Form.Label>
          <Form.Select 
            name="genero" 
            {...register('genero')}>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="NN">Prefiero no decirlo</option>
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
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$/i,
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
            type='number'
            name="telefono"
            {
              ...register('telefono',{
                required: {
                  value: false,
                  message: 'Campo requerido'
                },
                pattern: { 
                  value: /^\+?[0-9\s-]+$/i,
                  message: 'Este campo solo acepta números'
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
            className="email"
            name="email"
            minLength={2}
            maxLength={300}
            {
              ...register('email',{
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
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>Fecha de Contratacion</Form.Label>
          <Form.Control
            placeholder="Ingrese fecha de contratacion"
            className="input"
            type='date'
            name="fecha_contratacion"
            {
              ...register('fecha_contratacion',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.fecha_contratacion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-6 mt-2'>
          <Form.Label>CUIL</Form.Label>
          <Form.Control
            placeholder="Ingrese CUIL del empleado"
            className="input"
            type='number'
            name="cuil"
            {
              ...register('cuil',{
                required: {
                  value: true,
                  message: 'Campo requerido'
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
            name="supervisor" 
            {...register('supervisor')}>
            <option value="admin">Tobias</option>
            <option value="usuario">Belén</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.supervisor?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-3 mt-2">
          <Form.Label>Rol</Form.Label>
          <Form.Select 
            name="rol" 
            {...register('rol')}>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.rol?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-3 mt-2">
          <Form.Label>Sector</Form.Label>
          <Form.Select 
            name="sector" 
            {...register('sector')}>
            <option value="admin">Administración</option>
            <option value="usuario">Bedelía</option>
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

export default Form_Update