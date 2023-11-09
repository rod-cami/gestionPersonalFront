import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BodyInfoEmployees from '../Employees_Modal_Body_Info/Body_Info_Employees';
import './Modal_Employees.css'
import Form_Create from '../Employees_Form_Create/Form_Create_Emp';
import Form_Update from '../Employees_Form_Update/Form_Update_Emp';
import BodyRolEmployees from '../Employees_Modal_Body_Rol/Body_Rol_Employees';
import BodySupervisorEmployees from '../Employees_Modal_Body_Supervisor/Body_Supervisor_Employees';
import BodyReportEmployees from '../Employees_Modal_Body_Report/Body_Report_Employees';

const ModalEmployees = ({show, handleClose, nombre, id}) => {

  let body_component = null

  switch (nombre) {
    case 'Info':
      body_component = <BodyInfoEmployees id={id}/>
      nombre = "Información del Empleado - Mejorar" 
      break;
    case 'add':
      body_component = <Form_Create/>
      nombre = "Agregar empleado" 
      break;
    case 'Update':
      body_component = <Form_Update id={id}/>
      nombre= "Modificar empleado"
      break;
    case 'Update_Rol':
      body_component = <BodyRolEmployees id={id}/>
      nombre= "Modificar Rol y Sector"
      break;
    case 'Update_Supervisor':
      body_component = <BodySupervisorEmployees id={id}/>
      nombre= "Modificar Supervisor"
      break;
    case 'Report':
      body_component = <BodyReportEmployees id={id}/>
      nombre= "Reporte empleado"
      break;

    default:
      body_component = 'La opción seleccionada no se encuentra disponible'
      break;
  }
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-light'>{nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body_component}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalEmployees