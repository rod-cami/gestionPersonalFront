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
        <Form.Group className="col-md-6 mt-2">
          <Form.Label>Genero</Form.Label>
          <Form.Select 
            name="genero" 
            {...register('genero')}>
            <option value='F'>Femenino</option>
            <option value='M'>Masculino</option>
            <option value='N'>Prefiero no decirlo</option>
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
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-dark">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Form_Update