import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Select, Typography, Callout, Toastr } from "neetoui";

import categoriesApi from "apis/categories";

const DeleteAlert = ({
  categories,
  deletedCategory,
  onClose,
  setCategoriesUpdated,
}) => {
  const [moveToCategory, setMoveToCategory] = useState({
    value: null,
    label: null,
  });

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(deletedCategory.id, {
        category: [deletedCategory.id, moveToCategory.value],
      });
      setCategoriesUpdated(true);
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleBeforeDelete = () => {
    moveToCategory.value !== null || categories.length === 1
      ? handleDelete()
      : Toastr.error("Please select a category");
  };

  const handleOpen = () => {
    if (categories.length === 1) {
      handleDelete();

      return false;
    }

    return true;
  };

  const categoryList = categories
    .map(category => ({
      label: category.category,
      value: category.id,
    }))
    .filter(category => category.value !== deletedCategory.id);

  return (
    <Modal isOpen={handleOpen()} onClose={onClose}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography className="mb-3" style="h5">
          {`You are permanently deleting category ${deletedCategory.category}. This action cannot be undone.`}
        </Typography>
        <Callout className="mb-3" icon={Warning} style="danger">
          {`Category ${deletedCategory.category} has ${deletedCategory.articles.length} articles. Before this category can be deleted, these
          articles needs to be moved to another category`}
        </Callout>
        <Select
          isSearchable
          required
          label="Select a category"
          name="category"
          options={categoryList}
          placeholder="Select Category"
          onChange={e => setMoveToCategory(e)}
        />
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Proceed"
          style="danger"
          type="submit"
          onClick={handleBeforeDelete}
        />
        <Button label="Cancel" style="text" type="cancel" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAlert;
