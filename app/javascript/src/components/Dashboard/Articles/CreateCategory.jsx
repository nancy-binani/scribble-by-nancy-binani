import React from "react";

import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import categoriesApi from "apis/categories";

const CreateCategory = ({
  category,
  isEdit,
  categories,
  createNewCategory,
  setCreateNewCategory,
}) => {
  const handleSubmit = async values => {
    categories.push(values.category);
    try {
      if (isEdit) {
        await categoriesApi.update(values.category, category.id);
      } else {
        await categoriesApi.create(values.category);
      }
      await categoriesApi.fetch();
    } catch (error) {
      logger.error(error);
    }
    setCreateNewCategory(!createNewCategory);
  };

  return (
    <Formik initialValues={category} onSubmit={handleSubmit}>
      <Form>
        <Input name="category" placeholder="Enter category" />
      </Form>
    </Formik>
  );
};

export default CreateCategory;
