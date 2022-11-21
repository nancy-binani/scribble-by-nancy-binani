import React from "react";

import { Alert } from "neetoui";

const DeleteAlert = ({ destroyArticle, deleteArticleId, title, onClose }) => {
  const handleDelete = () => {
    destroyArticle(deleteArticleId);
    onClose();
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
