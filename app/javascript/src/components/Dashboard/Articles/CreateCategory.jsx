import React from "react";

import { Formik, Form } from "formik";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/admin/categories";

import { CATEGORY_VALIDATION_SCHEMA } from "./constants";

const CreateCategory = ({
  category,
  isEdit,
  categories,
  createNewCategory,
  setCreateNewCategory,
  fetchCategories,
}) => {
  const handleSubmit = async values => {
    categories.push(values.category);
    try {
      if (isEdit) {
        await categoriesApi.update({ category: values.category }, category.id);
      } else {
        await categoriesApi.create({ category: values.category });
      }
    } catch (error) {
      logger.error(error);
    }
    setCreateNewCategory(!createNewCategory);
    fetchCategories();
  };

  return (
    <Formik
      initialValues={category}
      validationSchema={CATEGORY_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <Form>
        <Input name="category" placeholder="Enter category" />
      </Form>
    </Formik>
  );
};

export default CreateCategory;
