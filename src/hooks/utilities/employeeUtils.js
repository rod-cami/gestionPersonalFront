import getDatos from '../api/getDatos';

const utilitiesEmployee = async ({ URL, userToken, id = 1}) => {

  const roles = await getDatos(`${URL}/Rol`,userToken);
  const sectores = await getDatos(`${URL}/Sector`,userToken);
  const empleados = await getDatos(`${URL}/Empleado`,userToken);
  const supervisores = empleados.filter(x => x.legajoEmpleado >= 100);
  const reportRoles = await getDatos(`${URL}/HistorialRol/${id}`,userToken)
  const reportSectores = await getDatos(`${URL}/HistorialSector/${id}`,userToken)
  const employee = await getDatos(`${URL}/Empleado/Detalle/${id}`,userToken);
  const supervisor = await getDatos(`${URL}/Empleado/${employee.legajoSupervisor}`,userToken);

  return {employee, supervisor, roles, sectores, supervisores, reportRoles, reportSectores, empleados}

}

const utilitiesSetReports = async ({sectores, roles, reportRoles, reportSectores}) => {
  let reportSectorTxt = "";
  let reportRolTxt = "";
  
  reportRoles.forEach(rs => {
    let rolNew = roles.find(x => x.idRol == rs.rolNuevo);
    let rolOld= roles.find(x => x.idRol == rs.rolViejo);

    if (reportRoles.length < 2) {
      reportRolTxt = "No hubo cambios de roles en el ciclo de este empleado";
    }else{

      if (rs.rolViejo == null && rs.rolNew == null) {
        reportRolTxt += ``;
      } else if (rs.rolViejo && rs.rolNew == null) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol}.`;
      } else if (rs.rolViejo) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol} y pasó al rol de ${rolNew.nombreRol}.`;
      }
      else {
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
      if (rs.sectorViejo == null && rs.sectorNew == null) {
        reportSectorTxt += ``;
      } else if (rs.sectorViejo && rs.sectorNew == null) {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector}.`;
      } else if (rs.sectorViejo) {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector} y pasó al sector de ${sectorNew.nombreSector}.`;
      }else {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el sector de ${sectorNew.nombreSector}. `
      }
    }
  })
  return { reportRolTxt, reportSectorTxt }
}


export {utilitiesEmployee , utilitiesSetReports}