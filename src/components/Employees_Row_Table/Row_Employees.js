import React, { useState } from 'react'
import ModalEmployees from '../Employees_Modal/Modal_Employees';
import Swal from 'sweetalert2';
import { showConfirmationAlert } from '../../hooks/utilities/notificationUtils';
import { Button } from 'react-bootstrap';

const RowEmployees = ({name,gender,phone,email,id,token,finContrato}) => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const set_action_modal = (action_modal) =>{
    setAction(action_modal);
    handleShow();
  }

  const eliminarEmpleado = async () =>{
    const response = await showConfirmationAlert();
    console.log(response)
  }

  return (
    <>
      <tr>
        <td className='align-middle'>{id}</td>
        <td className='align-middle'>{name}</td>
        <td className='align-middle'>{gender}</td>
        <td className='align-middle'>{phone}</td>
        <td className='align-middle'>{email}</td>

        {finContrato ? 
          <td className='text-center'>
            <button type="button" className="btn  btn-outline-info m-1" onClick={()=>{set_action_modal('Info')}}><i className="bi bi-info-lg"></i></button>
            <button type="button" className="btn btn-outline-danger m-1"><i className="bi bi-trash3" onClick={eliminarEmpleado}></i></button>
            <button type="button" className='btn btn-outline-primary m-1' onClick={()=>{set_action_modal('Report')}}><i className="bi bi-flag"></i></button>
          </td>
          : 
          <td className='text-center'>
            <button type="button" className="btn btn-outline-warning m-1" onClick={()=>{set_action_modal('Update')}}><i className="bi bi-pencil"></i></button>
            <button type="button" className="btn btn-outline-info m-1" onClick={()=>{set_action_modal('Info')}}><i className="bi bi-info-lg"></i></button>
            <button type="button" className="btn btn-outline-danger m-1"><i className="bi bi-trash3" onClick={eliminarEmpleado}></i></button>

            {id >= 100 ? null : <button type="button" className="btn btn-outline-secondary m-1"  onClick={()=>{set_action_modal('Update_Supervisor')}}><i className="bi bi-person-badge"></i></button>}
            <button type="button" className="btn btn-outline-success m-1" onClick={()=>{set_action_modal('Update_Rol')}}><i className="bi bi-person-vcard-fill"></i></button>
            <button type="button" className="btn btn-outline-primary m-1" onClick={()=>{set_action_modal('Report')}}><i className="bi bi-flag"></i></button>
          </td>
        }
        
      </tr>

      <ModalEmployees show={show} handleClose={handleClose} nombre={action} id={id} token={token}/>
    </>
  )
}

export default RowEmployees