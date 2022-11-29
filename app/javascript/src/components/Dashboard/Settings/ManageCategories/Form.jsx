import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Pane, Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/admin/categories";

import { CATEGORY_VALIDATION_SCHEMA } from "../../Articles/constants";

const Form = ({ showPane, setShowPane, category, isEdit, fetchCategories }) => {
  const onClose = () => setShowPane(false);
  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await categoriesApi.update({ category: values.category }, category.id);
      } else {
        await categoriesApi.create({ category: values.category });
      }
    } catch (error) {
      logger.error(error);
    }
    fetchCategories();
  };

  return (
    <Formik
      initialValues={category}
      validationSchema={CATEGORY_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <Pane isOpen={showPane} onClose={onClose}>
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            Add Category
          </Typography>
        </Pane.Header>
        <FormikForm>
          <Pane.Body className="space-y-6">
            <Input
              className="w-full flex-grow-0"
              name="category"
              placeholder="Enter a category"
            />
          </Pane.Body>
          <Pane.Footer>
            <Button
              className="mr-3"
              label={isEdit ? "Update" : "Save Changes"}
              size="large"
              style="primary"
              type="submit"
            />
            <Button
              label="Cancel"
              size="large"
              style="text"
              onClick={onClose}
            />
          </Pane.Footer>
        </FormikForm>
      </Pane>
    </Formik>
  );
};

export default Form;
