import * as yup from "yup";

export const projectSchema = yup.object().shape({
  name: yup
    .string()
    .required("Project name is required")
    .min(3, "Name must be at least 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters long"),

  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),

  endDate: yup
    .date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(yup.ref("startDate"), "End date cannot be before start date"),

  status: yup
    .string()
    .oneOf(["pending", "in-progress", "completed"], "Invalid status")
    .required("Status is required"),
});

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(30, "Name cannot exceed 30 characters"),

  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .min(3, "Username must be at least 3 characters long")
    .max(25, "Username cannot exceed 25 characters"),

  role: yup
    .string()
    .oneOf(["user", "manager"], "Invalid role")
    .required("Role is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export const loginValidation = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
