export const REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export const REDIRECTION_INITIAL_VALUE = {
  id: null,
  oldurl: "",
  newurl: "",
};

export const MENU_OPTIONS = [
  {
    id: 1,
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    url: "/settings/",
  },
  {
    id: 2,
    label: "Redirections",
    description: "Create & configure redirection rules",
    url: "/settings/redirections",
  },
  {
    id: 3,
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
    url: "/settings/managecategories",
  },
];
