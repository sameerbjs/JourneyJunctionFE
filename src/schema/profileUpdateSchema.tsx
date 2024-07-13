import * as Yup from "yup";

const validationProfileSchema = Yup.object().shape({
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
});

export default validationProfileSchema;
