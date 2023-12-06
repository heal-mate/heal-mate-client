import LoadingSpinner from "@/components/LoadingSpinner";
import { createPortal } from "react-dom";

export default function LoadingSpinnerPotal() {
  return (
    <div>
      {createPortal(
        <LoadingSpinner />,
        document.getElementById("loading-spinner-root")! as HTMLElement,
      )}
    </div>
  );
}
