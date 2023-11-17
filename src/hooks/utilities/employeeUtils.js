
const generateReportTexts = async ({sectores, roles, reportRoles, reportSectores}) => {
  let reportSectorTxt = "";
  let reportRolTxt = "";
  
  reportRoles.forEach(rs => {
    let rolNew = roles.find(x => x.idRol === rs.rolNuevo);
    let rolOld= roles.find(x => x.idRol === rs.rolViejo);

    if (rolNew) {
      if (rolOld) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejó el rol de ${rolOld.nombreRol} y pasó al rol de ${rolNew.nombreRol}.`;
      }
      else {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el rol de ${rolNew.nombreRol}.`;
      }
    }else{
      if (rolOld) {
        reportRolTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejó el rol de ${rolOld.nombreRol}.`;
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
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejó el sector de ${sectorOld.nombreSector} y pasó al sector de ${sectorNew.nombreSector}. `;
      } else {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} comenzó a trabajar en el sector de ${sectorNew.nombreSector}. `
      }
    } else {
      if (sectorOld) {
        reportSectorTxt += `El día ${(rs.fechaCambio.slice(0,10))} dejó el sector de ${sectorOld.nombreSector}.`;
      } else {
        reportSectorTxt += ``;
      }
    }
    reportSectorTxt += "<br>";
  })
  return { reportRolTxt, reportSectorTxt }
}

const obtenerFechaYHora = () => {
  const fechaActual = new Date();
  
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();

  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
  const horaFormateada = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

  return { fecha: fechaFormateada, hora: horaFormateada };
};


export {generateReportTexts, obtenerFechaYHora}