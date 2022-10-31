import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  category: {
    value: "",
    label: "",
  },
};

export const CATEGORY_INITIAL_VALUE = {
  id: "",
  category: "",
};

export const MENU_OPTIONS = ["All", "Draft", "Published"];

export const ARTICLES_FORM_VALIDATION_SCHEMA = CATEGORIES =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Description is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
        value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
      })
      .required("Please select a category"),
  });

export const STATUS = ["Draft", "Published"];
export const FILTERING_OPTIONS = [
  "Title",
  "Categories",
  "Date",
  "Author",
  "Status",
];
