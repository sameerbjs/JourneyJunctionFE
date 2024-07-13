import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NotificationService {
    success(message: string, options = {}) {
        toast.dismiss();
        toast.success(message, {
            autoClose: 2000, // Adjust the auto-close duration as needed
            position: "top-right",
            ...options,
        });
    }

    error(message: string, options = {}) {
        toast.dismiss();
        toast.error(message, {
            autoClose: 2000, // Adjust the auto-close duration as needed
            position: "top-right",
            ...options,
        });
    }

    info(message: string, options = {}) {
        toast.dismiss();
        toast.info(message, {
            autoClose: 2000, // Adjust the auto-close duration as needed
            position: "top-right",
            ...options,
        });
    }

    warning(message: string, options = {}) {
        toast.dismiss();
        toast.warning(message, {
            autoClose: 2000, // Adjust the auto-close duration as needed
            position: "top-right",
            ...options,
        });
    }

    clear() {
        toast.dismiss();
    }

    render() {
        return <ToastContainer position="top-right" autoClose={2000} />
    }
}

export default new NotificationService();
