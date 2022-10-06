import React from "react";

import Form from "./Form";

const Edit = () => {
  const article = history.location.state.article;

  return <Form isEdit article={article} />;
};

export default Edit;
