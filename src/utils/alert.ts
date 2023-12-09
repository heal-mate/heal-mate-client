import { theme } from "@/styles/theme";
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

export function customConfirmAlert(title: string) {
  return Swal.fire({
    title,
    icon: "warning",
    customClass: {
      icon: "alert-icon",
      popup: "alert-popup",
    },
    showCancelButton: true,
    confirmButtonColor: theme.colors.point,
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  });
}
