
const generateReportTexts = async ({sectores, roles, reportRoles, reportSectores}) => {
  let reportSectorTxt = "";
  let reportRolTxt = "";
  
  reportRoles.forEach(rs => {
    let rolNew = roles.find(x => x.idRol === rs.rolNuevo);
    let rolOld= roles.find(x => x.idRol === rs.rolViejo);

    if (rolNew) {
      if (rolOld) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol} y pasó al rol de ${rolNew.nombreRol}.`;
      }
      else {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el rol de ${rolNew.nombreRol}.`;
      }
    }else{
      if (rolOld) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol}.`;
      }
      else{
        reportRolTxt += ``;
      }
    }
    reportRolTxt += "<br>";
  })

  reportSectores.forEach(rs => {
    let sectorNew = sectores.find(x => x.idSector === rs.sectorNuevo);
    let sectorOld= sectores.find(x => x.idSector === rs.sectorViejo);

    if (sectorNew) {
      if (sectorOld) {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector} y pasó al sector de ${sectorNew.nombreSector}. `;
      } else {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el sector de ${sectorNew.nombreSector}. `
      }
    } else {
      if (sectorOld) {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector}.`;
      } else {
        reportSectorTxt += ``;
      }
    }
    reportSectorTxt += "<br>";
  })
  return { reportRolTxt, reportSectorTxt }
}


export {generateReportTexts}