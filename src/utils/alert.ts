import Swal, { SweetAlertIcon } from "sweetalert2";

export default function customAlert(
  title: string,
  showConfirmButton: boolean = false,
  icon: SweetAlertIcon = "success",
  timer: number = 1000,
) {
  return Swal.fire({
    position: "center",
    icon,
    customClass: {
      icon: "alert-icon",
    },
    title,
    showConfirmButton,
    timer,
  });
}
