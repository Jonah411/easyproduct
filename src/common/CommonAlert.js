import { toast } from "react-toastify";

export const CommonAlert = (msg, key) => {
  toast[key](msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
