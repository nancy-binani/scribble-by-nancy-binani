import React from "react";

import { Formik, Form } from "formik";
import { Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";

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
        Toastr.success("Category is updated successfully.");
      } else {
        await categoriesApi.create({ category: values.category });
        Toastr.success("Category is created successfully.");
      }
    } catch (error) {
      logger.error(error);
      Toastr.error("Category is not deleted.");
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
