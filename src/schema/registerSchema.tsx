import * as Yup from "yup";

const validationRegisterSchema = Yup.object().shape({
    full_name: Yup.string()
        .trim()
        .required("Full Name is required.")
        .min(3, "Full Name must be at least 3 characters.")
        .max(100, "Full Name must not exceed 100 characters.")
        .matches(
            /^\S.*\S$/,
            "Full Name must not be empty or contain only whitespace."
        ),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(
            /^\S.*\S$/,
            "Password must not be empty or contain only whitespace."
        ),
    country: Yup.string()
        .trim()
        .required("Country is required.")
        .matches(
            /^\S.*\S$/,
            "Country must not be empty or contain only whitespace."
        ),
    state: Yup.string()
        .trim()
        .nullable()
        .matches(
            /^\S.*\S$/,
            "Country must not be empty or contain only whitespace."
        ),
    profile_img: Yup.string().trim().required("Profile image is required."),
});

export default validationRegisterSchema;
