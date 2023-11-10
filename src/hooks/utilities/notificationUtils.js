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

export {showConfirmationAlert}