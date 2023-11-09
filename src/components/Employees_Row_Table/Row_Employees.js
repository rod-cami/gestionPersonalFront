import React, { useState } from 'react'
import ModalEmployees from '../Employees_Modal/Modal_Employees';
import Swal from 'sweetalert2';

const RowEmployees = ({name,gender,phone,email,id}) => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const set_action_modal = (action_modal) =>{
    setAction(action_modal);
    handleShow();
  }

  const eliminarEmpleado = async () =>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    })
    
    await swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "Este proceso es inrevertible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El empleado se encuentra a salvo',
          'error'
        )
      }
    })
  }

  return (
    <>
      <tr>
        <td className='align-middle'>{id}</td>
        <td className='align-middle'>{name}</td>
        <td className='align-middle'>{gender}</td>
        <td className='align-middle'>{phone}</td>
        <td className='align-middle'>{email}</td>
        <td className='text-center'>
          <button type="button" className="btn btn1 btn-outline-warning m-1" onClick={()=>{set_action_modal('Update')}}><i className="bi bi-pencil"></i></button>
          <button type="button" className="btn btn1 btn-outline-info m-1" onClick={()=>{set_action_modal('Info')}}><i className="bi bi-info-lg"></i></button>
          <button type="button" className="btn btn1 btn-outline-danger m-1"><i className="bi bi-trash3" onClick={eliminarEmpleado}></i></button>
          <button type="button" className="btn btn1 btn-outline-secondary m-1" onClick={()=>{set_action_modal('Update_Supervisor')}}><i className="bi bi-person-badge"></i></button>
          <button type="button" className="btn btn1 btn-outline-success m-1" onClick={()=>{set_action_modal('Update_Rol')}}><i className="bi bi-person-vcard-fill"></i></button>
          <button type="button" className="btn btn-outline-primary" onClick={()=>{set_action_modal('Report')}}><i className="bi bi-flag"></i></button>
        </td>
      </tr>

      <ModalEmployees show={show} handleClose={handleClose} nombre={action} id={id}/>
    </>
  )
}

export default RowEmployees