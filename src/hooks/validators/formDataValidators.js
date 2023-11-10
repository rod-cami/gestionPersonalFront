
import { fetchEmployeeUtilities } from "../utilities/connectionUtils"
import { showDuplicateAlert } from "../utilities/notificationUtils"

const emailValidator = async ({userToken,email, id}) => {
  const {empleados, employeeUpdate} = await fetchEmployeeUtilities({userToken: userToken, id: id})
  if (employeeUpdate.correo !== email) {
    if (empleados.find(x => x.correo === email)) {
      await showDuplicateAlert("El email ya pertenece a un empleado.")
      return false
    }
  }
  return true
}

const cuilValidator = async ({userToken,cuil}) => {
  const {empleados} = await fetchEmployeeUtilities({ userToken: userToken})
  if (empleados.find(x => x.cuil === cuil)) {
    await showDuplicateAlert("El cuil ya pertenece a un empleado.")
    return false
  }
  return true
}

export {emailValidator, cuilValidator}