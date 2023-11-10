import getDatos from '../useApi/getDatos';

const utilitiesEmployer = async ({ URL, userToken, id = 1}) => {
  const roles = await getDatos(`${URL}/Rol`,userToken);
  const sectores = await getDatos(`${URL}/Sector`,userToken);
  const empleados = await getDatos(`${URL}/Empleado`,userToken);

  const reportRoles = await getDatos(`${URL}/HistorialRol/${id}`,userToken)
  const reportSectores = await getDatos(`${URL}/HistorialSector/${id}`,userToken)
  const supervisores = empleados.filter(x => x.legajoEmpleado >= 100);
  const employer = await getDatos(`${URL}/Empleado/Detalle/${id}`,userToken);
  const supervisor = await getDatos(`${URL}/Empleado/${employer.legajoSupervisor}`,userToken);
  return {employer, supervisor, roles, sectores, supervisores, reportRoles, reportSectores, empleados}
}


export {utilitiesEmployer}