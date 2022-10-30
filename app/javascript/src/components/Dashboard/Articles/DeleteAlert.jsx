import React from "react";

import { Alert, Toastr } from "neetoui";

const DeleteAlert = ({ destroyArticle, id, title, onClose }) => {
  const handleDelete = () => {
    destroyArticle(id);
    onClose();
    Toastr.success("Article is deleted successfully.");
  };

  return (
    <Alert
      isOpen
      message={`Are you sure you want to continue deleting ${title} ? This cannot be undone.`}
      title="Delete the article"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
