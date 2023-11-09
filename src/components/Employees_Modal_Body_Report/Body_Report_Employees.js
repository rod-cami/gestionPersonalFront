import React, { useEffect, useState } from 'react'
import { utilitiesEmployer} from '../../hooks/useForm/utilities';

const BodyReportEmployees = ({id}) => {

  const [employer, setEmployer] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [reportRoles, setReportRoles] = useState([]);
  const [reportSectores, setReportSectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDatos = async () => {
    const { employer, roles, sectores, reportRoles, reportSectores} = await utilitiesEmployer({ id });
    setEmployer(employer);
    setRoles(roles);
    setSectores(sectores);
    setReportRoles(reportRoles);
    setReportSectores(reportSectores);
    setLoading(false);
    console.log(sectores)
  };

  useEffect(()=>{obtenerDatos()},[]);
  
  

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
        {reportRoles.length < 2 ? "No hubo cambios de roles en el ciclo de este empleado" : reportRoles.map(rol => <p>El día {(rol.fechaCambio).slice(0,10)} {rol.rolViejo ? roles.map(rolNombre => rolNombre.idRol == rol.rolViejo ? `dejo el rol de ${rolNombre.nombreRol}` : null ) > roles.map(rolNombre => rolNombre.idRol == rol.rolNuevo ? `y paso al ${rolNombre.nombreRol}` : null ) : roles.map(rolNombre => rolNombre.idRol == rol.rolNuevo ? `comenzó a trabajar en el rol de ${rolNombre.nombreRol}` : null)} </p>)}

        <p>Sectores</p>
        {reportSectores.length < 2 ? "No hubo cambios de roles en el ciclo de este empleado" : reportSectores.map(sector => <p>El día {(sector.fechaCambio).slice(0,10)}  {sector.sectorViejo ? sectores.map(sectorNombre => sectorNombre.idSector == sector.sectorViejo ? `dejo el sector de ${sectorNombre.nombreSector}` : null) > sectores.map(sectorNombre => sectorNombre.idSector == sector.sectorNuevo ? `y paso al sector de ${sectorNombre.nombreSector}` : null) : sectores.map(sectorNombre => sectorNombre.idSector == sector.sectorViejo ? `comenzo a trabajar en el sector de ${sectorNombre.nombreSector}` : null)} </p>)}
      </div>
  )
}

export default BodyReportEmployees