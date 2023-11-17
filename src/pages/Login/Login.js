import React, { useState } from 'react'
import './Login.css';
import { Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../hooks/utilities/loginUtils';

const Login = () => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [load, setLoad] = useState(false)

  const datos = new URLSearchParams();
  const procesarFormulario = async (data, e) =>{
    setLoad(true)
    datos.append('username', data.username);
    datos.append('password', data.password);

    const response = await loginUser({datos: datos})
    
    if (response !== false) {
      localStorage.setItem('user', data.username);
      localStorage.setItem('token', response);
      setLoad(false)
      window.location.reload();
    }
  }
  
  return (
    <div className='border border-0 p-lg-5 py-5 px-2 rounded-5 login'>
      <h1 className='fs-1 text-center fw-bold'>Bienvenido</h1>
      <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Inicie sesión para ingresar al módulo de gestión de personal</p>
      <Form className='row m-0 p-1' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-12 mt-3">
          <Form.Label className='text-lg font-medium'>Email</Form.Label>
          <Form.Control
            placeholder="Ingrese el email del usuario"
            className="input w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            name="username"
            minLength={2}
            maxLength={300}
            {
              ...register('username',{
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
            {errors.username?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-12 mt-2'>
          <Form.Label className='text-lg font-medium'>Contraseña</Form.Label>
          <Form.Control
            placeholder="Ingrese contraseña del usuario"
            className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
            type="password"
            name="password"
            minLength={4}
            maxLength={16}
            {
              ...register('password',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 16,
                  message: 'Debe ser menor a 16'
                },
                minLength: {
                  value: 4,
                  message: 'Debe ser mayor a 4'
                },
                pattern: { 
                  value: /^[a-zA-Z]+[0-9]+$/i,
                  message: 'La contraseña debe tener al entre 4 y 16 caracteres con números y letras'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 bg-violet-500 rounded-xl text-white font-bold text-lg'> { load==true ?  <Spinner color='light'></Spinner>  : <p className='fw-light'> Ingresar </p>}</button>
        </div>
      </Form>
    </div>
  )
}

export default Login