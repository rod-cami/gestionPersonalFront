import { deleteData, putData, postData, getData } from '../api/servicesApi';
import { showFailureAlert, showLogoutAlert, showSuccessAlert } from './notificationUtils';


const URL = process.env.REACT_APP_API_URL;

const fetchEmployeeUtilities = async ({userToken, id = 1 }) => {

  const roles = await getData(`${URL}/Rol`,userToken);
  
  if (roles === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    await showLogoutAlert();
    window.location.reload();
  }
  const sectores = await getData(`${URL}/Sector`,userToken);
  const empleados = await getData(`${URL}/Empleado`,userToken);
  const reportRoles = await getData(`${URL}/HistorialRol/${id}`,userToken)
  const reportSectores = await getData(`${URL}/HistorialSector/${id}`,userToken)
  const employee = await getData(`${URL}/Empleado/Detalle/${id}`,userToken);
  const employeeUpdate = await getData(`${URL}/Empleado/${id}`,userToken);
  const supervisor = await getData(`${URL}/Empleado/${employee.legajoSupervisor}`,userToken);
  
  const supervisores = empleados.filter(x => x.rolIdRol === 8);
  const noSupervisores = empleados.filter(x => x.rolIdRol !== 8);

  return {employee, supervisor, roles, sectores, supervisores, reportRoles, reportSectores, empleados, noSupervisores, employeeUpdate}

}

const addNewEmployee = async ({userToken,data}) => {
  const response_api = await postData(`${URL}/Empleado`,data,userToken)
  if (response_api.status === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    await showLogoutAlert();
    window.location.reload();
  } else if (response_api.status === 200) {
    await showSuccessAlert();
  } else{
    await showFailureAlert();
  }
}

const updateEmployee = async ({userToken, data, id}) => {
  const response_api = await putData(`${URL}/Empleado/${id}`,data,userToken)
  if (response_api.status === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    await showLogoutAlert();
    window.location.reload();
  } else if (response_api.status === 200) {
    await showSuccessAlert();
  } else{
    await showFailureAlert();
  }
}

const deleteEmployee = async ({userToken, id}) =>{
  const response_api = await deleteData(`${URL}/Empleado/${id}`,userToken)
  if (response_api.status === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    await showLogoutAlert();
    window.location.reload();
  } else if (response_api.status === 200) {
    await showSuccessAlert();
  } else{
    await showFailureAlert();
  }
}

export {fetchEmployeeUtilities, addNewEmployee, updateEmployee, deleteEmployee}