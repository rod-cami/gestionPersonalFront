import React, { useState } from 'react'
import TableEmployees from '../../components/Employees_Table/Table_Employees'
import ModalEmployees from '../../components/Employees_Modal/Modal_Employees';
import { showLogoutAlert } from '../../hooks/utilities/notificationUtils';

const VistaEmployees = ({token}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  token = localStorage.getItem('token');
  const user = localStorage.getItem('user')

  const logoutUser = async () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    await showLogoutAlert("Sesión cerrada");
    window.location.reload();
  }
  
  return (
    <div transition-style="in:wipe:bottom-right">
      <div className='d-flex justify-content-between m-5'>
        <button type='button' className='btn btn-outline-dark' onClick={logoutUser}><i class="bi bi-box-arrow-left"></i> Cerrar sesión</button>
        <div>
          <p className='fw-light'>{user}</p>
        </div>
      </div>
      <h1 className='fs-1 text-center fw-light my-5'>Administrar Empleados</h1>
      <div className='px-5 mx-5'>
          <div className='d-flex justify-content-end mb-3'><button type="button" className="btn btn-outline-dark " onClick={handleShow}><i className="bi bi-person-add mx-1 fs-6"> Agregar </i></button></div>
          <TableEmployees token={token} />
      </div>
      
      <ModalEmployees show={show} handleClose={handleClose} nombre={'add'} id={'3'} token={token}/>
    </div>
  )
}

export default VistaEmployees