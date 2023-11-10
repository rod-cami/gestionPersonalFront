import React, { useState } from 'react'
import TableEmployees from '../../components/Employees_Table/Table_Employees'
import ModalEmployees from '../../components/Employees_Modal/Modal_Employees';

const VistaEmployees = ({token}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  token = localStorage.getItem('token');
  
  return (
    <div transition-style="in:wipe:bottom-right">
      <h1 className='fs-1 text-center fw-light my-5'>Administrar Empleados</h1>
      <div className='px-5 mx-5'>
          <button type="button" className="btn btn-outline-dark " onClick={handleShow}><i className="bi bi-person-add mx-1 fs-6"> Agregar </i></button>
          <TableEmployees token={token} />
      </div>
      
      <ModalEmployees show={show} handleClose={handleClose} nombre={'add'} id={'3'} token={token}/>
    </div>
  )
}

export default VistaEmployees