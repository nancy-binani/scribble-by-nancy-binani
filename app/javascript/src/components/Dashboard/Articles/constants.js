import * as yup from "yup";

import { buildSelectOptions } from "../../../utils";

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  assigned_category: {
    id: "",
    category: "",
  },
};

export const CATEGORY_INITIAL_VALUE = {
  id: "",
  category: "",
};

export const MENU_OPTIONS = ["All", "Draft", "Published"];

export const CATEGORIES = buildSelectOptions([
  "Getting Started",
  "Security & Privacy",
  "Misc",
]);

export const ARTICLES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Description is required"),
  category: yup
    .object()
    .nullable()
    .shape({
      label: yup.string().oneOf(CATEGORIES.map(contact => contact.label)),
      value: yup.string().oneOf(CATEGORIES.map(contact => contact.value)),
    })
    .required("Please select a contact"),
});

export const STATUS = ["Draft", "Published"];
export const FILTERING_OPTIONS = [
  "Title",
  "Categories",
  "Date",
  "Author",
  "Status",
];
