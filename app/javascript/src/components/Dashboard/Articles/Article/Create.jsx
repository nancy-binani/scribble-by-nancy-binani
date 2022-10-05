import React from "react";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_VALUES } from "../constants";

const Create = ({ history }) => (
  <Form
    article={ARTICLES_FORM_INITIAL_VALUES}
    history={history}
    isEdit={false}
  />
);

export default Create;
