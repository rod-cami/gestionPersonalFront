import { async } from "q";
import Swal from "sweetalert2";

const showConfirmationAlert = async () => {
  let bandera = false;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-outline-success m-2',
      cancelButton: 'btn btn-outline-danger m-2'
    },
    buttonsStyling: false
  })
  
  await swalWithBootstrapButtons.fire({
    title: '¿Está seguro?',
    text: "Al aceptar no hay vuelta atrás",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      bandera = true;
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Operación cancelada',
        'error'
      )
    }
  })

  return bandera
}

const showLogoutAlert = async () =>{
  await Swal.fire({
    position: "center",
    icon: "info",
    title: "La sesión expiró!",
    text: "Vamos a recargar la pagína para que vuelvas a iniciar sesión.",
  });
}

const showSuccessAlert = async () =>{
  await Swal.fire({
    position: "center",
    icon: "success",
    title: "Operación realizada con éxito",
    showConfirmButton: false,
    timer: 1200
  });
}

const showFailureAlert = async () =>{
  await Swal.fire({
    position: "center",
    icon: "error",
    title: "Ocurrió un error inesperado.",
    text: "Por favor intente más tarde",
    showConfirmButton: false,
    timer: 1500
  });
}

const showDuplicateAlert = async (message) =>{
  await Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    text: "Por favor intente con otro.",
    showConfirmButton: false,
    timer: 1500
  });
}

export {showConfirmationAlert , showLogoutAlert, showSuccessAlert, showFailureAlert, showDuplicateAlert}