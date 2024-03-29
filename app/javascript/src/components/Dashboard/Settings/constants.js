import { Settings, Text, ExternalLink } from "neetoicons";
import * as yup from "yup";

export const VALID_PASSWORD_REGEX =
  /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/;

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

export const SIDENAV_LINKS = [
  {
    icon: Text,
    label: "Articles",
    to: "/articles",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
  },
  {
    icon: ExternalLink,
    label: "Eui",
    to: "/public/",
  },
];

export const ACTIONS = ["Edit", "Delete"];

export const BANNER_DESCRIPTION =
  "You can reorder categories or articles by drag and drop here. You can also multiselect articles and move them together to any category you have created.";
