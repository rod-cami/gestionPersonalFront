import React, { useEffect, useState } from 'react'
import { utilitiesEmployee, utilitiesSetReports} from '../../hooks/utilities/employeeUtils';
import { async } from 'q';



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
    const url = process.env.REACT_APP_API_URL;
    const { employee, roles, sectores, reportRoles, reportSectores} = await utilitiesEmployee({ URL: url, userToken: token, id: id });
    const { reportRolTxt, reportSectorTxt } = await utilitiesSetReports({sectores, roles, reportRoles, reportSectores});

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
        <h5>Historial del empleado {employee.nombreEmpleado}</h5>
        <p>Actualmente el empleado trabaja en el sector Bedelía como Secretario</p>

        <p>Roles</p>
        <p>{txtReportRol}</p>

        <p>Sectores</p>
        <p>{txtReportSector}</p>
      </div>
  )
}

export default BodyReportEmployees