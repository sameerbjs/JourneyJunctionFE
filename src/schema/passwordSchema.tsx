import * as Yup from "yup";

const validationPasswordSchema = Yup.object().shape({
    current_password: Yup.string()
        .min(8, "Curent Password must be at least 8 characters")
        .required("Curent Password is required"),
    new_password: Yup.string()
        .min(8, "New Password must be at least 8 characters")
        .required("New Password is required"),
});

export default validationPasswordSchema;