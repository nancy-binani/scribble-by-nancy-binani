import * as yup from "yup";

export const REGEXP = /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/;

export const SITE_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
      "Password must contain one letter and one digit."
    ),
});

export const MENU_OPTIONS = [
  {
    id: 1,
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
  },
  {
    id: 2,
    label: "Redirections",
    description: "Create & configure redirection rules",
  },
  {
    id: 3,
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
  },
];
