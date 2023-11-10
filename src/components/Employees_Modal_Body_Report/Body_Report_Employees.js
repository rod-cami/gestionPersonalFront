import React, { useEffect, useState } from 'react'
import { utilitiesEmployer} from '../../hooks/useForm/utilities';

let reportSectorTxt = "";
let reportRolTxt = "";

const BodyReportEmployees = ({ id }) => {

  const [employer, setEmployer] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [reportRoles, setReportRoles] = useState([]);
  const [reportSectores, setReportSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txtReportRol, setTxtReportRol] = useState(null);
  const [txtReportSector, setTxtReportSector] = useState(null);
  
  const obtenerDatos = async () => {
    const userToken = localStorage.getItem('token'); 
    const url = process.env.REACT_APP_API_URL;
    const { employer, roles, sectores, reportRoles, reportSectores} = await utilitiesEmployer({ URL: url, userToken: userToken, id: id });
    setEmployer(employer);
    setRoles(roles);
    setSectores(sectores);
    setReportRoles(reportRoles);
    setReportSectores(reportSectores);
    setReports();
  };

  useEffect(()=>{obtenerDatos()},[]);

  const setReports = () => {
    reportRoles.forEach(rs => {
      let rolNew = roles.find(x => x.idRol == rs.rolNuevo);
      let rolOld= roles.find(x => x.idRol == rs.rolViejo);
  
      if (reportRoles.length < 2) {
        reportRolTxt = "No hubo cambios de roles en el ciclo de este empleado";
      }else{
        if (rs.rolViejo) {
          reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol} y pasó al rol de ${rolNew.nombreRol}.`;
        } else {
          reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el rol de ${rolNew.nombreRol}`;
        }
      }
    })

  
    reportSectores.forEach(rs => {
      let sectorNew = sectores.find(x => x.idSector == rs.sectorNuevo);
      let sectorOld= sectores.find(x => x.idSector == rs.sectorViejo);
  
      if (reportSectores.length < 2) {
        reportSectorTxt = "No hubo cambios de sectores en el ciclo de este empleado";
      }else{
        if (rs.sectorViejo) {
          reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector} y pasó al sector de ${sectorNew.nombreSector}.`;
        } else {
          reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el sector de ${sectorNew.nombreSector}. `
        }
      }
    })

    setTxtReportRol(reportRolTxt);
    setTxtReportSector(reportSectorTxt);
  }
  
  if (txtReportRol === null || txtReportSector === null) {
    return <div>Cargando...</div>;
  }

  if (!employer) {
    return <div>No se encontraron datos</div>;
  }


  return (
    <div className='mx-3'>
        <h5>Historial del empleado {employer.nombreEmpleado}</h5>
        <p>Actualmente el empleado trabaja en el sector Bedelía como Secretario</p>

        <p>Roles</p>
        <p>{reportRolTxt}</p>

        <p>Sectores</p>
        <p>{reportSectorTxt}</p>
      </div>
  )
}

export default BodyReportEmployees