import React, { useEffect, useState } from 'react'
import { utilitiesEmployer} from '../../hooks/useForm/utilities';

const BodyReportEmployees = ({id}) => {

  const [employer, setEmployer] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [reportRoles, setReportRoles] = useState([]);
  const [reportSectores, setReportSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportSectorTxt, setReportSectorTxt] = useState('Cargando...');
  const [reportRolTxt, setReportRolTxt] = useState('Cargando...');

  const obtenerDatos = async () => {
    const { employer, roles, sectores, reportRoles, reportSectores} = await utilitiesEmployer({ id: id });
    setEmployer(employer);
    setRoles(roles);
    setSectores(sectores);
    setReportRoles(reportRoles);
    setReportSectores(reportSectores);
    setLoading(false);
  };

  useEffect(()=>{obtenerDatos()},[]);

  reportRoles.forEach(rs => {
    let rolNew = roles.find(x => x.idRol == rs.rolNuevo);
    let rolOld= roles.find(x => x.idRol == rs.rolViejo);

    if (reportRoles.length < 2) {
      setReportRolTxt("No hubo cambios de roles en el ciclo de este empleado")
    }else{
      if (rs.rolViejo) {
        setReportRolTxt(`El día ${rs.fechaCambio} dejo el rol de ${rolOld} y pasó al rol de ${rolNew}.`);
      } else {
        setReportRolTxt(`El día ${rs.fechaCambio} comenzó a trabajar en el rol de ${rolNew}`)
      }
    }
  })

  reportSectores.forEach(rs => {
    let sectorNew = sectores.find(x => x.idRol == rs.sectorNuevo);
    let sectorOld= sectores.find(x => x.idRol == rs.sectorViejo);

    if (reportSectores.length < 2) {
      setReportSectorTxt("No hubo cambios de sectores en el ciclo de este empleado")
    }else{
      if (rs.sectorViejo) {
        setReportSectorTxt(`El día ${rs.fechaCambio} dejo el sector de ${sectorOld} y pasó al sector de ${sectorNew}.`);
      } else {
        setReportSectorTxt(`El día ${rs.fechaCambio} comenzó a trabajar en el sector de ${sectorNew}`)
      }
    }
  })
  
  

  if (loading) {
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