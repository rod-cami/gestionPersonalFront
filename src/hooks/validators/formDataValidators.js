
import { fetchEmployeeUtilities } from "../utilities/connectionUtils"
import { showDuplicateAlert } from "../utilities/notificationUtils"

const emailValidator = async ({userToken,email, id}) => {
  if (id !== null) {
    const {empleados, employeeUpdate} = await fetchEmployeeUtilities({userToken: userToken, id: id})
    if (employeeUpdate.correo !== email) {
      if (empleados.find(x => x.correo === email)) {
        await showDuplicateAlert("El email ya pertenece a un empleado.")
        return false
      }
    }
  }else{
    const {empleados} = await fetchEmployeeUtilities({userToken: userToken, id: 1})
    if (empleados.find(x => x.correo === email)) {
      await showDuplicateAlert("El email ya pertenece a un empleado.")
      return false
    }
  }
  return true
}

const cuilValidatorFinal = async ({userToken,cuil}) => {
  const {empleados} = await fetchEmployeeUtilities({ userToken: userToken})
  if (empleados.find(x => x.cuil === cuil)) {
    await showDuplicateAlert("El cuil ya pertenece a un empleado.")
    return false
  }

  if (!cuilValidator(cuil)) {
    await showDuplicateAlert("El cuil no es válido")
    return false
  }
  return true
}

const cuilValidator = (cuil) => {
  if (cuil.length !== 11) {
    return false;
  }

  const [checkDigit, ...rest] = cuil
    .split('')
    .map(Number)
    .reverse();

  const total = rest.reduce(
    (acc, cur, index) => acc + cur * (2 + (index % 6)),
    0,
  );

  const mod11 = 11 - (total % 11);

  if (mod11 === 11) {
    return checkDigit === 0;
  }

  if (mod11 === 10) {
    return false;
  }

  return checkDigit === mod11;
}


export {emailValidator, cuilValidatorFinal}