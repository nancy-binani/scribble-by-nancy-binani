import { buildSelectOptions } from "src/utils";
import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  categories: [],
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
    .array()
    .of(
      yup.object().shape({
        label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
        value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
      })
    )
    .min(1, "Please select atleast one category")
    .required("Please select atleast one category"),
});
