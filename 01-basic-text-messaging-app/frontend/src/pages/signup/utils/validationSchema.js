import * as Yup from "yup";

const signupValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required!")
    .min(4, "username must be at least 4 characters"),

  password: Yup.string()
    .required("password is required")
    .min(8, "password must be at least 8 characters"),

  confirmPassword: Yup.string()
    .required("password is required")
    .min(8, "password must be at least 8 characters"),
});

export default signupValidationSchema;
