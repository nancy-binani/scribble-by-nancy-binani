import React from "react";

import Form from "./Form";

const Edit = ({ history, article }) => (
  <Form isEdit article={article} history={history} />
);

export default Edit;
