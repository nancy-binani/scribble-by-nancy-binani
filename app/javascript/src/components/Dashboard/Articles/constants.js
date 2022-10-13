import { buildSelectOptions } from "src/utils";
import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
};

export const CATEGORY_INITIAL_VALUE = {
  id: "",
  category: "",
};

export const CATEGORIES = buildSelectOptions([
  "Getting Started",
  "Security & Privacy",
  "Misc",
]);

export const ARTICLES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Description is required"),
  categories: yup
    .object()
    .nullable()
    .shape({
      label: yup.string().oneOf(CATEGORIES.map(contact => contact.label)),
      value: yup.string().oneOf(CATEGORIES.map(contact => contact.value)),
    })
    .required("Please select a contact"),
});
