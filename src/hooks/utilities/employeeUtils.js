
const generateReportTexts = async ({sectores, roles, reportRoles, reportSectores}) => {
  let reportSectorTxt = "";
  let reportRolTxt = "";
  
  reportRoles.forEach(rs => {
    let rolNew = roles.find(x => x.idRol === rs.rolNuevo);
    let rolOld= roles.find(x => x.idRol === rs.rolViejo);

    if (rs.rolViejo === null && rs.rolNew === null) {
      reportRolTxt += ``;
    } else if (rs.rolViejo && rs.rolNew === null) {
      reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol}.`;
    } else if (rs.rolViejo) {
      reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el rol de ${rolOld.nombreRol} y pasó al rol de ${rolNew.nombreRol}.`;
    }
    else {
      reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el rol de ${rolNew.nombreRol}. `;
    }
  })

  reportSectores.forEach(rs => {
    let sectorNew = sectores.find(x => x.idSector === rs.sectorNuevo);
    let sectorOld= sectores.find(x => x.idSector === rs.sectorViejo);

    if (rs.sectorViejo === null && rs.sectorNew === null) {
      reportSectorTxt += ``;
    } else if (rs.sectorViejo && rs.sectorNew === null) {
      reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector}.`;
    } else if (rs.sectorViejo) {
      reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejo el sector de ${sectorOld.nombreSector} y pasó al sector de ${sectorNew.nombreSector}. `;
    }else {
      reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el sector de ${sectorNew.nombreSector}. `
    }
  })
  return { reportRolTxt, reportSectorTxt }
}


export {generateReportTexts}