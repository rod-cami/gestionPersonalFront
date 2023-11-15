import React, { useEffect, useState } from 'react'
import { fetchEmployeeUtilities } from '../../hooks/utilities/connectionUtils';
import { generateReportTexts } from '../../hooks/utilities/employeeUtils';

const BodyReportEmployees = ({ id , token}) => {

  const [employee, setEmployee] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [reportRoles, setReportRoles] = useState([]);
  const [reportSectores, setReportSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txtReportRol, setTxtReportRol] = useState(null);
  const [txtReportSector, setTxtReportSector] = useState(null);
  
  const obtenerDatos = async () => {
    const { employee, roles, sectores, reportRoles, reportSectores} = await fetchEmployeeUtilities({userToken: token, id: id });
    const { reportRolTxt, reportSectorTxt } = await generateReportTexts({sectores, roles, reportRoles, reportSectores});

    setEmployee(employee);
    setRoles(roles);
    setSectores(sectores);
    setReportRoles(reportRoles);
    setReportSectores(reportSectores);
    setTxtReportRol(reportRolTxt);
    setTxtReportSector(reportSectorTxt);
    setLoading(false)
  };

  useEffect(()=>{obtenerDatos()},[]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employee) {
    return <div>No se encontraron datos</div>;
  }


  return (
    <div className='mx-3'>
        <h5 className='fw-medium mt-2 fs-5'>Historial del empleado {employee.nombreEmpleado}</h5>
        <p className='fw-light mt-1'>Actualmente el empleado trabaja en el sector Bedelía como Secretario</p>

        <p className='fw-medium mt-2 fs-5'>Roles</p>
        <p className='fw-light mt-1' dangerouslySetInnerHTML={{ __html: txtReportRol}}></p>

        <p className='fw-medium mt-2 fs-5'>Sectores</p>
        <p className='fw-light mt-1' dangerouslySetInnerHTML={{ __html: txtReportRol}}></p>
      </div>
  )
}

export default BodyReportEmployees