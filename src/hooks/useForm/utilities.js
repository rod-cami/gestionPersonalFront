import getDatos from '../useApi/getDatos';

const utilitiesEmployer = async ({id}) => {

  const roles = await getDatos(`/Rol`);
  const sectores = await getDatos(`/Sector`);
  const empleados = await getDatos(`/Empleado`);

  const reportRoles = await getDatos(`/HistorialRol/${id}`)
  const reportSectores = await getDatos(`/HistorialSector/${id}`)
  const supervisores = empleados.filter(x => x.legajoEmpleado >= 100);
  const employer = await getDatos(`/Empleado/Detalle/${id}`);
  const supervisor = await getDatos(`/Empleado/${employer.legajoSupervisor}`);

  

  return {employer, supervisor, roles, sectores, supervisores, reportRoles, reportSectores,}
}


export {utilitiesEmployer}