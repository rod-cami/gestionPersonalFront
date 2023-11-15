import { postLogin } from "../api/servicesApi";
import { showFailureAlert, showFailureLogin } from "./notificationUtils";

const URL = process.env.REACT_APP_LOGIN_USER_URL;

const loginUser = async ({datos}) =>{
  try {
    const response_api = await postLogin(URL,datos)
    if (response_api.detail == "Incorrect email or password" ) {
      await showFailureLogin("El email o la contraseña son incorrectos")
      window.location.reload()
      return false
    }
    return response_api.access_token
  } catch (error) {
    await showFailureAlert()
    window.location.reload()
  }
}

export {loginUser}