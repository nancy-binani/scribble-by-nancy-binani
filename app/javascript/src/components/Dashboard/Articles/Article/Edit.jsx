import React from "react";

import Form from "./Form";
import VersionHistory from "./VersionHistory";

import Navbar from "../../../Navbar";

const Edit = ({ history }) => {
  const article = history.location.state.article;

  return (
    <>
      <Navbar showTag status={article.status} />
      <div className="flex">
        <Form isEdit article={article} history={history} />
        <VersionHistory article={article} history={history} />
      </div>
    </>
  );
};

export default Edit;
