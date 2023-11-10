import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { utilitiesEmployee} from '../../hooks/utilities/employeeUtils';

const BodySupervisorEmployees = ({id,token}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [employee, setEmployee] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    
    const url = process.env.REACT_APP_API_URL;
    const { employee, supervisor, supervisores} = await utilitiesEmployee({URL: url, userToken: token, id: id });
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

  const procesarFormulario = (data, e) =>{
    console.log(data)
  }

  return (
    <Fragment>
      <div className='mx-3'>
        {supervisor ? <p>Actualmente {employee.genero === 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} parece no tener empleado supervisor</p> : <p>Actualmente {employee.genero === 'F' ? "la empleada" : "el empleado"} {employee.nombreEmpleado}, {employee.apellidoEmpleado} se encuentra supervisado por {supervisor.nombreEmpleado}, {supervisor.apellidoEmpleado} </p>}
      </div>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
        <Form.Group className="col-md-12 mt-2">
          <Form.Label>Supervisor</Form.Label>
          <Form.Select 
            name="supervisor" 
            {...register('supervisor')}>
            {supervisores.map(supervisor => <option value={supervisor.legajoEmpleado}>{supervisor.apellidoEmpleado}, {supervisor.nombreEmpleado}</option>)}
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