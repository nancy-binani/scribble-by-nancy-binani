import React from "react";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_VALUES } from "../constants";

const Create = () => (
  <Form article={ARTICLES_FORM_INITIAL_VALUES} isEdit={false} />
);

export default Create;
