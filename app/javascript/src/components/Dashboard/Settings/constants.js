import * as yup from "yup";

export const REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export const REDIRECTION_INITIAL_VALUE = {
  id: null,
  from: "",
  to: "",
};

export const SITE_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      "Password must contain one letter and one digit."
    ),
});

export const MENU_OPTIONS = [
  {
    id: 1,
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    url: "/settings?tab=general",
  },
  {
    id: 2,
    label: "Redirections",
    description: "Create & configure redirection rules",
    url: "/settings?tab=redirections",
  },
  {
    id: 3,
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
    url: "/settings?tab=managecategories",
  },
];
